import { 
  notion, 
  getPageIdFromDatabasePage, 
  getCategoryFromDatabasePage, 
  getSlugFromDatabasePage, 
  getTitleFromDatabasePage, 
  getDateFromDatabasePage,
  getMarkdown, 
  getBlocks,
  download ,
  extractFilenameFromPath
} from './notionHelpers'

import path from 'path'

export async function getIdeasFromDatabase() {
  const response = await notion.databases.query({ database_id: process.env.NOTION_IDEAS_DB });
  // console.log({step: 'response', response: JSON.stringify(response.results)})
  const ideasWithMarkdown = await Promise.all(response.results.map((idea) => {
      const pageId = getPageIdFromDatabasePage(idea)
      const category = getCategoryFromDatabasePage(idea) // returns an array
      const slug = getSlugFromDatabasePage(idea)
      const title = getTitleFromDatabasePage(idea)
      const date = getDateFromDatabasePage(idea)
      return getMarkdown(pageId, true).then((md) => {
          return {
              id: pageId,
              category: category,
              slug: slug,
              title: title,
              date: date,
              markdown: md,
          }
      })
  }))
  return ideasWithMarkdown.sort((a,b) => Date.parse(b.date) - Date.parse(a.date));
}

export async function downloadAllIdeasImages() {
  // 1. Map over all records in the database
  const ideasFromDatabase = await getIdeasFromDatabase()
  // 2. For each record, retrieve all blocks of the page ID
  await Promise.all(ideasFromDatabase.map((record) => {
    // console.log({step: "record", obj: record})
    const allBlocks = getBlocks(record.id).then((blocks) =>{
      // console.log({step: "allBlocks", obj: blocks})
      // 3. Map over all blocks on the page
      // 4. For each block, if it is an image, download the image
      blocks.filter((block) => {return block.type == "image"}).map((block) => {
        const filename = extractFilenameFromPath(block.image.file.url)
        console.log(`Downloading ${filename}...`)
        // console.log({step: "download", obj: {
        //   url: block.image.file.url,
        //   path: filename,
        //  }})
        // in getStaticProps, we will replace the URL with the new path.
        // download(block.image.file.url, path.join('public', 'images', 'ideas', filename), function(){
        //   console.log(`Download complete`);
        // });
      })
    })
  }))
}