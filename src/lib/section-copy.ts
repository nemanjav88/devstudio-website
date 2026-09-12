import type { Locale } from './i18n'
import type { Section } from './content'

const copy = {
  en: {
    projects: { title: 'Ideas.\nMade tangible.', label: 'Projects', intro: 'Physical products. Digital experiences. The work that brings our disciplines together.' },
    solutions: { title: 'What We Build', label: 'What We Build', intro: 'From digital and retail to custom engineering and production. One connected approach to what you need to build.' },
    stories: { title: 'Inside\nthe making.', label: 'Stories', intro: 'Projects, technology and the thinking behind the work. Notes from Dev Studio.' },
    resources: { title: 'The details.\nAll in one place.', label: 'Resources', intro: 'Catalogs, product information and thematic brochures. Explore the details in BHS and English.' },
    empty: 'More to come.', emptyBody: 'There are no published entries in this language yet. Explore another part of the studio or tell us what you have in mind.',
    unavailable: 'Please check back shortly.', unavailableBody: 'This content is temporarily unavailable. You can still explore the studio or get in touch.',
    missing: 'This page is not available.', missingBody: 'The link may have changed, or this entry is not published in this language.',
    browse: 'Explore', contact: 'Start a Project', back: 'Back to', related: 'Connected work', downloads: 'Downloads',
    client: 'Client', year: 'Year', industry: 'Industry', services: 'Services', technologies: 'Technologies',
    project: 'Project', solution: 'Solution', story: 'Story', gallery: 'A closer look', watch: 'Watch video',
    openImage: 'Open image', closeGallery: 'Close gallery', previousImage: 'Previous image', nextImage: 'Next image',
    read: 'Read story', view: 'Explore project', viewSolution: 'Explore solution', previous: 'Previous', next: 'Next', page: 'Page',
    all: 'All', language: 'File language', category: 'Material type', pdf: 'Download PDF', noFiles: 'No files in this selection.',
    noFilesBody: 'Try another language or material type, or contact us for the information you need.',
    catalog: 'Complete catalog', 'product-flyer': 'Products & flyers',
    'thematic-brochure': 'Thematic brochures', publication: 'Published', overview: 'Overview',
    'digital-retail': 'Retail Technology & Digital Systems', 'brand-experiences': 'Brand Experiences & Activations', entertainment: 'Dev Studio Products',
    'custom-engineering': 'Custom Products & Interactive Systems', production: 'Production & Fabrication',
    'project-story': 'Project Story', video: 'Video', news: 'News', technology: 'Technology', 'behind-the-build': 'Behind the Build', 'case-study': 'Case Study',
  },
  bhs: {
    projects: { title: 'Ideje.\nU stvarnom obliku.', label: 'Projekti', intro: 'Fizički proizvodi. Digitalna iskustva. Rad koji povezuje naše discipline.' },
    solutions: { title: 'Šta stvaramo', label: 'Šta stvaramo', intro: 'Od digitalnih i maloprodajnih iskustava do inženjeringa po mjeri i proizvodnje. Jedan povezan pristup onome što želite izgraditi.' },
    stories: { title: 'Iza\nstvaranja.', label: 'Priče', intro: 'Projekti, tehnologija i razmišljanje iza našeg rada. Bilješke iz Dev Studija.' },
    resources: { title: 'Detalji.\nNa jednom mjestu.', label: 'Resursi', intro: 'Katalozi, informacije o proizvodima i tematske brošure. Istražite detalje na BHS i engleskom jeziku.' },
    empty: 'Uskoro više.', emptyBody: 'Još nema objavljenog sadržaja na ovom jeziku. Istražite drugi dio studija ili nam recite šta imate na umu.',
    unavailable: 'Posjetite nas ponovo uskoro.', unavailableBody: 'Ovaj sadržaj trenutno nije dostupan. I dalje možete istražiti studio ili nas kontaktirati.',
    missing: 'Ova stranica nije dostupna.', missingBody: 'Link je možda promijenjen ili sadržaj nije objavljen na ovom jeziku.',
    browse: 'Istražite', contact: 'Pokrenimo projekat', back: 'Nazad na', related: 'Povezani rad', downloads: 'Preuzimanja',
    client: 'Klijent', year: 'Godina', industry: 'Industrija', services: 'Usluge', technologies: 'Tehnologije',
    project: 'Projekat', solution: 'Rješenje', story: 'Priča', gallery: 'Pogled izbliza', watch: 'Pogledajte video',
    openImage: 'Otvori sliku', closeGallery: 'Zatvori galeriju', previousImage: 'Prethodna slika', nextImage: 'Sljedeća slika',
    read: 'Pročitajte priču', view: 'Istražite projekat', viewSolution: 'Istražite rješenje', previous: 'Prethodna', next: 'Sljedeća', page: 'Stranica',
    all: 'Sve', language: 'Jezik datoteke', category: 'Vrsta materijala', pdf: 'Preuzmite PDF', noFiles: 'Nema datoteka u ovom izboru.',
    noFilesBody: 'Pokušajte sa drugim jezikom ili vrstom materijala, ili nas kontaktirajte za potrebne informacije.',
    catalog: 'Kompletan katalog', 'product-flyer': 'Proizvodi i flajeri',
    'thematic-brochure': 'Tematske brošure', publication: 'Objavljeno', overview: 'Pregled',
    'digital-retail': 'Retail tehnologija i digitalni sistemi', 'brand-experiences': 'Brend iskustva i aktivacije', entertainment: 'Dev Studio proizvodi',
    'custom-engineering': 'Custom proizvodi i interaktivni sistemi', production: 'Proizvodnja i izrada',
    'project-story': 'Priča o projektu', video: 'Video', news: 'Novosti', technology: 'Tehnologija', 'behind-the-build': 'Iza izrade', 'case-study': 'Studija slučaja',
  },
}

export function sectionCopy(locale: Locale, section: Section) { return copy[locale][section] }
export function ui(locale: Locale) { return copy[locale] }
