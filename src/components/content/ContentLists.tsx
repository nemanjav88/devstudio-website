import type { Download } from '@/payload-types'
import { availableDownload, coverMedia, description, documentHref, fileSize, populated, type EditorialCollection, type EditorialDocument } from '@/lib/content'
import { localizedHref, type Locale } from '@/lib/i18n'
import { sectionCopy, ui } from '@/lib/section-copy'
import { ContentMedia } from './ContentMedia'

export function EditorialList({ collection, docs, locale, compact = false }: { collection: EditorialCollection; docs: EditorialDocument[]; locale: Locale; compact?: boolean }) {
  const labels = ui(locale)
  return <div className={`editorial-list editorial-list--${collection}${compact ? ' editorial-list--compact' : ''}`}>
    {docs.map((doc, index) => {
      const media = coverMedia(doc)
      const client = 'client' in doc ? populated(doc.client)?.name : undefined
      const type = 'type' in doc ? labels[doc.type] : 'solutionGroup' in doc ? labels[doc.solutionGroup] : client
      return <article className={`editorial-entry${media?.url ? '' : ' editorial-entry--text'}`} key={doc.id}>
        <a href={documentHref(collection, doc, locale)}>
          <div className="entry-image">{media?.url ? <ContentMedia media={media} alt={doc.title} presentation={collection === 'solutions' ? 'solution-card' : undefined} /> : <span className="entry-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}</div>
          <div className="entry-copy">
            <div className="meta"><span>{type || sectionCopy(locale, collection).label}</span>{'year' in doc && doc.year && <span>{doc.year}</span>}</div>
            <h2>{doc.title}<span className="entry-arrow" aria-hidden="true">↗</span></h2>
            {description(doc) && <p>{description(doc)}</p>}
            <span className="entry-action">{collection === 'stories' ? labels.read : collection === 'solutions' ? labels.viewSolution : labels.view} <span aria-hidden="true">↗</span></span>
          </div>
        </a>
      </article>
    })}
  </div>
}

export function DownloadList({ docs, locale }: { docs: Download[]; locale: Locale }) {
  return <div className="download-list">{docs.filter(availableDownload).map(doc => <a className={`download-row${doc.category === 'catalog' ? ' download-row--catalog' : ''}`} href={doc.url!} download key={doc.id}>
    {doc.category === 'catalog' && populated(doc.thumbnail)?.url && <div className="download-cover"><ContentMedia media={doc.thumbnail} /></div>}
    <span className="download-icon" aria-hidden="true">↧</span>
    <div className="download-info"><span className="meta">{ui(locale)[doc.category]}</span><h3>{doc.title?.trim() || doc.filename || ui(locale).pdf}</h3>
      <span className="meta">{[doc.language === 'en' ? 'EN' : 'BHS', 'PDF', fileSize(doc.filesize), doc.year].filter(Boolean).join(' / ')}</span>
    </div><span className="download-action">{ui(locale).pdf} <span aria-hidden="true">↗</span></span>
  </a>)}</div>
}

export function Pagination({ path, page, totalPages, locale, filters = {} }: { path: string; page: number; totalPages: number; locale: Locale; filters?: Record<string, string> }) {
  if (totalPages <= 1) return null
  const href = (target: number) => localizedHref(`${path}?${new URLSearchParams({ ...filters, page: String(target) })}`, locale)
  return <nav className="content-pagination" aria-label={locale === 'bhs' ? 'Stranice' : 'Pagination'}>
    {page > 1 ? <a href={href(page - 1)} rel="prev">← {ui(locale).previous}</a> : <span />}
    <span className="meta">{ui(locale).page} {page} / {totalPages}</span>
    {page < totalPages ? <a href={href(page + 1)} rel="next">{ui(locale).next} →</a> : <span />}
  </nav>
}

export function EmptyState({ locale, unavailable = false, resources = false }: { locale: Locale; unavailable?: boolean; resources?: boolean }) {
  const labels = ui(locale)
  return <div className="content-empty">
    <span className="empty-symbol" aria-hidden="true">✳</span><div>
      <h2>{unavailable ? labels.unavailable : resources ? labels.noFiles : labels.empty}</h2>
      <p>{unavailable ? labels.unavailableBody : resources ? labels.noFilesBody : labels.emptyBody}</p>
      <a className="text-link" href={localizedHref('/about', locale)}>{labels.browse} Dev Studio <span aria-hidden="true">↗</span></a>
    </div>
  </div>
}
