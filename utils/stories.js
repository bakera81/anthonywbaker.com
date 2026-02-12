import {
  notion,
  getPageIdFromDatabasePage,
  getSlugFromDatabasePage,
  getTitleFromDatabasePage,
  getLastEditedAtFromDatabasePage,
  getCreatedAtFromDatabasePage,
  getMarkdown,
} from "./notionHelpers"

export async function getStoriesFromDatabase() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_STORIES_DB,
    filter: {
      property: "Status",
      multi_select: {
        contains: "Complete",
      },
    },
  })
  // console.log({step: 'response', response: JSON.stringify(response.results)})
  const storiesWithMarkdown = await Promise.all(
    response.results.map((story) => {
      const pageId = getPageIdFromDatabasePage(story)
      //   const category = getCategoryFromDatabasePage(story) // returns an array
      const slug = getSlugFromDatabasePage(story)
      const title = getTitleFromDatabasePage(story)
      const lastEditedAt = getLastEditedAtFromDatabasePage(story)
      const createdAt = getCreatedAtFromDatabasePage(story)
      return getMarkdown(pageId).then((md) => {
        return {
          id: pageId,
          //   category: category,
          slug: slug,
          title: title,
          lastEditedAt: lastEditedAt,
          createdAt: createdAt,
          markdown: md,
        }
      })
    })
  )
  // console.log({step: 'getStoriesFromDatabase', storiesWithMarkdown: JSON.stringify(response.results)})
  return storiesWithMarkdown.sort(() => Math.random() - 0.5)
}

export async function queryStoriesDatabase(slug) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_STORIES_DB,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  })
  // console.log({step: 'queryRecipesDatabase', response: JSON.stringify(response.results[0])})
  const pageId = getPageIdFromDatabasePage(response.results[0])
  // const category = getCategoryFromDatabasePage(response.results[0])
  const title = getTitleFromDatabasePage(response.results[0])
  return getMarkdown(pageId).then((md) => {
    return {
      id: pageId,
      // category: category,
      slug: slug,
      title: title,
      markdown: md,
    }
  })
}
