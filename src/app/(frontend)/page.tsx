import { HomePrototype } from '@/components/home/HomePrototype'
import { headers } from 'next/headers'
import { getHomeCmsData, homeLocaleFromAcceptLanguage } from '@/lib/homepage'

export default async function HomePage() {
  const requestHeaders = await headers()
  const locale = homeLocaleFromAcceptLanguage(requestHeaders.get('accept-language'))
  const cms = await getHomeCmsData(locale)
  return <HomePrototype cms={cms} />
}
