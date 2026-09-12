export const publicSolutionGroups = [
  'digital-retail',
  'brand-experiences',
  'custom-engineering',
  'entertainment',
] as const

export type PublicSolutionGroup = typeof publicSolutionGroups[number]

const homepageCategoryGroups: Record<string, PublicSolutionGroup> = {
  'retail technology & digital systems': 'digital-retail',
  'retail tehnologija i digitalni sistemi': 'digital-retail',
  'brand experiences & activations': 'brand-experiences',
  'brend iskustva i aktivacije': 'brand-experiences',
  'custom products & interactive systems': 'custom-engineering',
  'custom proizvodi i interaktivni sistemi': 'custom-engineering',
  'dev studio products': 'entertainment',
  'dev studio proizvodi': 'entertainment',
}

export function publicSolutionGroupForHomepageCategory(name: string): PublicSolutionGroup | undefined {
  return homepageCategoryGroups[name.trim().toLocaleLowerCase().replace(/\s+/g, ' ')]
}
