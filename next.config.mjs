import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Sharp's native sidecar libraries must accompany its addon in standalone
  // output (notably Windows DLLs; Linux packages use separate libvips files).
  outputFileTracingIncludes: {
    '**/*': ['./node_modules/@img/sharp-*/**/*'],
  },
  images: {
    // Short, non-immutable TTL also bounds staleness for unversioned public files.
    minimumCacheTTL: 3600,
    localPatterns: [
      { pathname: '/api/media/file/**' }, // Allow persisted revision query strings.
      { pathname: '/**', search: '' },
    ],
  },
}

export default withPayload(nextConfig)
