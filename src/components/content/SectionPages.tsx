import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { Download, Project, Solution, Story } from '@/payload-types'
import { coverMedia, description, pageNumber, populated, type EditorialCollection, type SearchParams, type Section } from '@/lib/content'
import { findDownloads, findEditorial, getDetail, getRelated } from '@/lib/content-data'
import { languageAlternates, localizedHref, type Locale } from '@/lib/i18n'
import { sectionCopy, ui } from '@/lib/section-copy'
import { ContentShell } from './ContentShell'
import { ContentMedia, ContentVideo, Gallery } from './ContentMedia'
import { DownloadList, EditorialList, EmptyState, Pagination } from './ContentLists'
import { EditorialText } from './EditorialText'

export async function indexMetadata(section: Section, locale: Locale, searchParams?: Promise<SearchParams>): Promise<Metadata> {
  const copy = sectionCopy(locale, section)
  const page = pageNumber((await searchParams)?.page)
  const path = `/${section}${page > 1 && section !== 'resources' ? `?page=${page}` : ''}`
  return { title: `${copy.label} — Dev Studio`, description: copy.intro,
    alternates: { canonical: localizedHref(path, locale), languages: languageAlternates(path) }, robots: { index: false, follow: false } }
}

export async function detailMetadata(collection: EditorialCollection, locale: Locale, slug: string): Promise<Metadata> {
  const result = await getDetail(collection, slug, locale)
  if (!result.doc) {
    if (!result.unavailable) notFound()
    return { title: `${ui(locale).unavailable} — Dev Studio`, robots: { index: false, follow: false } }
  }
  return { title: `${result.doc.title} — Dev Studio`, description: description(result.doc),
    alternates: { canonical: result.translatedPaths[locale], languages: result.languages }, robots: { index: false, follow: false } }
}

function SectionIntro({ section, locale }: { section: Section; locale: Locale }) {
  const copy = sectionCopy(locale, section)
  return <header className="content-intro content-pad">
    <div className="section-label"><span>DEV STUDIO / {copy.label}</span><span>BANJA LUKA · BA</span></div>
    <h1>{copy.title.split('\n').map((line, index) => <span key={line} className={index ? 'muted' : undefined}>{line}</span>)}</h1>
    <p>{copy.intro}</p>
  </header>
}

export async function IndexPage({ collection, locale, searchParams }: { collection: EditorialCollection; locale: Locale; searchParams: Promise<SearchParams> }) {
  const page = pageNumber((await searchParams).page)
  const result = await findEditorial(collection, locale, page)
  if (!result.unavailable && page > 1 && page > result.totalPages) notFound()
  return <ContentShell locale={locale}>
    <SectionIntro section={collection} locale={locale} />
    <section className={`content-index content-index--${collection} content-pad`} aria-label={sectionCopy(locale, collection).label}>
      {result.docs.length ? <EditorialList collection={collection} docs={result.docs} locale={locale} /> : <EmptyState locale={locale} unavailable={result.unavailable} />}
      <Pagination path={`/${collection}`} page={page} totalPages={result.totalPages} locale={locale} />
    </section>
  </ContentShell>
}

function ProjectFacts({ project, locale }: { project: Project; locale: Locale }) {
  const labels = ui(locale)
  const facts = [
    [labels.client, populated(project.client)?.name], [labels.year, project.year], [labels.industry, project.industry],
    [labels.services, project.services?.map(item => item.service).filter(Boolean).join(' / ')],
    [labels.technologies, project.technologies?.map(item => item.technology).filter(Boolean).join(' / ')],
  ].filter(([, value]) => Boolean(value))
  if (!facts.length) return null
  return <dl className="project-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
}

export async function DetailPage({ collection, locale, slug }: { collection: EditorialCollection; locale: Locale; slug: string }) {
  const result = await getDetail(collection, slug, locale)
  if (!result.doc) {
    if (!result.unavailable) notFound()
    return <ContentShell locale={locale}><SectionIntro section={collection} locale={locale} /><section className="content-pad"><EmptyState locale={locale} unavailable /></section></ContentShell>
  }
  const doc = result.doc
  const related = await getRelated(collection, doc, locale)
  const media = coverMedia(doc)
  const labels = ui(locale)
  const category = collection === 'solutions' ? labels[(doc as Solution).solutionGroup] : collection === 'stories' ? labels[(doc as Story).type] : labels.project
  return <ContentShell locale={locale} translatedPaths={result.translatedPaths}>
    <article className={`content-detail content-detail--${collection}`}>
      <header className="detail-intro content-pad">
        <a className="text-link detail-back" href={localizedHref(`/${collection}`, locale)}>← {labels.back} {sectionCopy(locale, collection).label}</a>
        <div className="section-label"><span>{category}</span><span>DEV STUDIO</span></div>
        <h1>{doc.title}</h1>
        {description(doc) && <p className="detail-deck">{description(doc)}</p>}
        {collection === 'projects' && <ProjectFacts project={doc as Project} locale={locale} />}
      </header>
      {media?.url && <figure className="detail-hero"><ContentMedia media={media} alt={doc.title} eager />
        {(doc.gallery?.find(item => populated(item.image)?.id === media.id)?.caption || media.caption) && <figcaption>{doc.gallery?.find(item => populated(item.image)?.id === media.id)?.caption || media.caption}</figcaption>}
      </figure>}
      {(doc.content?.root?.children?.length || ('video' in doc && (doc.video?.file || doc.video?.url))) ? <section className="detail-narrative content-pad">
        <span className="eyebrow">{labels.overview}</span>
        <div><EditorialText content={doc.content} locale={locale} />{'video' in doc && <ContentVideo video={doc.video} locale={locale} />}</div>
      </section> : null}
      <Gallery gallery={doc.gallery?.filter(item => populated(item.image)?.id !== media?.id)} locale={locale} />
      {(related.projects.length > 0 || related.stories.length > 0 || related.solutions.length > 0) && <section className="related-content content-pad" aria-label={labels.related}>
        <div className="section-label"><span>{labels.related}</span><span>+</span></div>
        {(['solutions', 'projects', 'stories'] as const).map(section => related[section].length > 0 && <div className="related-group" key={section}>
          <h2 className="related-heading"><a href={localizedHref(`/${section}`, locale)}>{sectionCopy(locale, section).label} <span aria-hidden="true">↗</span></a></h2>
          <EditorialList collection={section} docs={related[section]} locale={locale} compact />
        </div>)}
      </section>}
      {related.downloads.length > 0 && <section className="detail-downloads content-pad"><div className="section-label"><span>{labels.downloads}</span><a href={localizedHref('/resources', locale)}>{labels.all} ↗</a></div><DownloadList docs={related.downloads} locale={locale} /></section>}
    </article>
  </ContentShell>
}

const categories: Download['category'][] = ['catalog', 'product-flyer', 'thematic-brochure']

export async function ResourcesPage({ locale, searchParams }: { locale: Locale; searchParams: Promise<SearchParams> }) {
  const query = await searchParams
  const page = pageNumber(query.page)
  const language = query.language === 'all' || query.language === 'en' || query.language === 'bhs' ? query.language : locale
  const category = typeof query.category === 'string' && categories.includes(query.category as Download['category']) ? query.category as Download['category'] : undefined
  const result = await findDownloads(locale, page, language, category)
  if (!result.unavailable && page > 1 && page > result.totalPages) notFound()
  const labels = ui(locale)
  const filters = { language, ...(category ? { category } : {}) }
  const filterHref = (values: Record<string, string>) => localizedHref(`/resources?${new URLSearchParams({ ...filters, ...values })}`, locale)
  return <ContentShell locale={locale}>
    <SectionIntro section="resources" locale={locale} />
    <section className="resource-library content-pad" aria-label={labels.downloads}>
      <div className="resource-filters">
        <div role="group" aria-label={labels.language}><span className="eyebrow">{labels.language}</span><div>{(['bhs', 'en', 'all'] as const).map(value => <a key={value} href={filterHref({ language: value })} aria-current={language === value ? 'true' : undefined}>{value === 'all' ? labels.all : value.toUpperCase()}</a>)}</div></div>
        <div role="group" aria-label={labels.category}><span className="eyebrow">{labels.category}</span><div>{(['all', ...categories] as const).map(value => <a key={value} href={filterHref({ category: value })} aria-current={(category || 'all') === value ? 'true' : undefined}>{value === 'all' ? labels.all : labels[value]}</a>)}</div></div>
      </div>
      {result.docs.length ? categories.map(group => {
        const docs = result.docs.filter(doc => doc.category === group)
        return docs.length ? <section className="resource-group" key={group}><h2>{labels[group]}</h2><DownloadList docs={docs} locale={locale} /></section> : null
      }) : <EmptyState locale={locale} unavailable={result.unavailable} resources />}
      <Pagination path="/resources" page={page} totalPages={result.totalPages} locale={locale} filters={filters} />
    </section>
  </ContentShell>
}

export async function ContentNotFound({ locale }: { locale: Locale }) {
  const labels = ui(locale)
  return <ContentShell locale={locale}><section className="content-intro content-pad content-missing">
    <p className="eyebrow">404 / DEV STUDIO</p><h1>{labels.missing}</h1><p>{labels.missingBody}</p>
    <div className="missing-links">{(['projects', 'solutions', 'stories', 'resources'] as const).map(section => <a className="text-link" href={localizedHref(`/${section}`, locale)} key={section}>{sectionCopy(locale, section).label} ↗</a>)}</div>
  </section></ContentShell>
}
