import type { Access, CollectionConfig } from 'payload'

export const authenticated: Access = ({ req }) => Boolean(req.user)
export const publicRead: Access = () => true
export const publishedOrAuthenticated: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } }

export const contentAccess: CollectionConfig['access'] = {
  create: authenticated,
  read: publicRead,
  update: authenticated,
  delete: authenticated,
}

export const editorialAccess: CollectionConfig['access'] = {
  ...contentAccess,
  read: publishedOrAuthenticated,
  readVersions: authenticated,
}
