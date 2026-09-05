import type { GlobalConfig } from 'payload'

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const globalAccess: GlobalConfig['access'] = {
  read: () => true,
  update: authenticated,
}
