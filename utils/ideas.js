import { 
  notion, 
  getPageIdFromDatabasePage, 
  getCategoryFromDatabasePage, 
  getSlugFromDatabasePage, 
  getTitleFromDatabasePage, 
  getMarkdown, 
  getBlocks,
  download 
} from './notionHelpers'

import { collectPaginatedAPI } from '@notionhq/client'

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

export async function downloadAllIdeasImages() {
  // 1. Map over all records in the database
  const ideasFromDatabase = await getIdeasFromDatabase()
  // 2. For each record, retrieve all blocks of the page ID
  await Promise.all(ideasFromDatabase.map((record) => {
    console.log({step: "record", obj: record})
    const allBlocks = getBlocks(record.id).then((blocks) =>{
      console.log({step: "allBlocks", obj: blocks})
      // 3. Map over all blocks on the page
      blocks.map((block) => {
        // 4. For each block, if it is an image, download the image
        if (block.type == "image") {
          console.log({step: "download", obj: block.image.file.url })
          download('https://www.google.com/images/srpr/logo3w.png', 'public/images/google.png', function(){
            console.log('Download complete');
          });
        }
      })
    })
  }))
}