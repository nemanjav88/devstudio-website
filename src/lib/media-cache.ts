import { stat } from 'node:fs/promises'
import path from 'node:path'
import type { CollectionConfig } from 'payload'

type Upload = Exclude<CollectionConfig['upload'], boolean | undefined>
type FileHandler = NonNullable<Upload['handlers']>[number]

/** Attach delivery behavior without changing the collection's fields or schema. */
export function withMediaCache(collection: CollectionConfig): CollectionConfig {
  const upload = collection.upload
  if (!upload || typeof upload !== 'object' || !upload.staticDir) return collection
  return { ...collection, upload: { ...upload, handlers: [...(upload.handlers || []), mediaCacheHeaders(upload.staticDir)] } }
}

/** Runs AFTER Payload's file access check; normal bodies/ranges remain Payload's. */
export function mediaCacheHeaders(staticDir: string): FileHandler {
  const handler = async (...[req, { params }]: Parameters<FileHandler>) => {
    if (req.method !== 'GET' || req.headers.has('range') || params.prefix
      || !params.filename || /[/\\\x00]/.test(params.filename)
      || !/\.(?:jpe?g|png|webp|avif|gif)$/i.test(params.filename)) return

    const root = path.resolve(staticDir)
    const file = path.resolve(root, params.filename)
    if (path.dirname(file) !== root) return
    let info
    try { info = await stat(file, { bigint: true }) } catch { return }
    if (!info.isFile()) return

    // A weak filesystem validator is sufficient for GET revalidation. Nanosecond
    // mtime/ctime and inode also detect same-size replacement and rapid edits.
    const etag = `W/"${info.size.toString(16)}-${info.mtimeNs.toString(16)}-${info.ctimeNs.toString(16)}-${info.ino.toString(16)}"`
    const modified = new Date(Number(info.mtimeMs))
    const headers = new Headers({
      'Cache-Control': 'public, max-age=0, must-revalidate',
      ETag: etag,
      'Last-Modified': modified.toUTCString(),
    })
    req.responseHeaders ??= new Headers()
    headers.forEach((value, key) => req.responseHeaders!.set(key, value))

    const ifNoneMatch = req.headers.get('if-none-match')
    const ifModifiedSince = req.headers.get('if-modified-since')
    // If-None-Match takes precedence, including when it does NOT match.
    const unchanged = ifNoneMatch !== null
      ? ifNoneMatch.split(',').some(value => value.trim() === '*' || value.trim().replace(/^W\//, '') === etag.replace(/^W\//, ''))
      : ifModifiedSince !== null && Number.isFinite(Date.parse(ifModifiedSince))
        && Math.floor(modified.getTime() / 1000) <= Math.floor(Date.parse(ifModifiedSince) / 1000)
    if (unchanged) return new Response(null, { status: 304 })
    // handleEndpoints merges req.responseHeaders into the default streamed response.
  }
  // Payload's declaration splits Promise<Response> | Promise<void>, although its
  // runtime explicitly supports an async handler that sometimes falls through.
  return handler as FileHandler
}
