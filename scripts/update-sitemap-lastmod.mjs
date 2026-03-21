import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const sitemapPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml')

const isoDate = new Date().toISOString().slice(0, 10)
const sitemap = await readFile(sitemapPath, 'utf8')

if (!/<lastmod>.*<\/lastmod>/.test(sitemap)) {
  throw new Error('No <lastmod> tag found in public/sitemap.xml')
}

const updated = sitemap.replace(/<lastmod>.*<\/lastmod>/, `<lastmod>${isoDate}</lastmod>`)

if (updated !== sitemap) {
  await writeFile(sitemapPath, updated, 'utf8')
  console.log(`Updated sitemap lastmod to ${isoDate}`)
} else {
  console.log('Sitemap lastmod already up to date')
}
