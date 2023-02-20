import { Client, collectPaginatedAPI, iteratePaginatedAPI } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import fs from 'fs'
import request from 'request'
import path from 'path'

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getMarkdown(id, useLocalImages = false) {
    // Get the markdown from a Notion page ID
    var mdblocks = await n2m.pageToMarkdown(id);
    // console.log({step: 'getMarkdown', obj: mdblocks})
    if (useLocalImages) {
        mdblocks = mdblocks.map((block) => {
            if(block.type == 'image') { 
                const imgPath = block.parent.replace('![](', '').replace(')', '')
                const filename = extractFilenameFromPath(imgPath)
                // TODO: Include alt text
                const newParent = `![](/../public/images/ideas/${filename})`
                return {
                    type: 'image',
                    parent: newParent,
                    children: [],
                }
            } else {
                return block
            }
        })
        // console.log({step: 'getMarkdown:images', obj: mdblocks})
    }
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString;
}

export function getBlocks(id) {
    const blocks = collectPaginatedAPI(notion.blocks.children.list, {
        block_id: id,
      })
    return blocks;
}

export function download(uri, filename, callback) {
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

export function extractFilenameFromPath(filePath) {
    return path.parse(filePath).base.split('?')[0]
}

export function getPageIdFromDatabasePage(record) {
    // console.log({
    //     step: 'getPageIdFromDatabasePageId', 
    //     recipe: JSON.stringify(recipe)
    // })
    return record.id
}

// returns an array
export function getCategoryFromDatabasePage(record) {
    return record.properties.Category.multi_select.map((category) => {
        return category.name
    })
}

export function getSlugFromDatabasePage(record) {
    return record.properties.Slug.rich_text.find((obj) => {
        return obj.type === "text"
    }).plain_text
}

export function getTitleFromDatabasePage(record) {
    return record.properties.Name.title.find((obj) => {
        return obj.type === "mention" || obj.type === "text"
    }).plain_text
}