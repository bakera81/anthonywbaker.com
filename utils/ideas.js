import { notion, getPageIdFromDatabasePage, getCategoryFromDatabasePage, getSlugFromDatabasePage, getTitleFromDatabasePage, getMarkdown } from './notionMarkdownHelpers'

export async function getIdeasFromDatabase() {
  const response = await notion.databases.query({ database_id: process.env.NOTION_IDEAS_DB });
  // console.log({step: 'response', response: JSON.stringify(response.results)})
  const ideasWithMarkdown = await Promise.all(response.results.map((idea) => {
      const pageId = getPageIdFromDatabasePage(idea)
      const category = getCategoryFromDatabasePage(idea) // returns an array
      const slug = getSlugFromDatabasePage(idea)
      const title = getTitleFromDatabasePage(idea)
      return getMarkdown(pageId).then((md) => {
          return {
              id: pageId,
              category: category,
              slug: slug,
              title: title,
              markdown: md,
          }
      })
  }))
  return ideasWithMarkdown;
}