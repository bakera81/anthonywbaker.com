import { Client, collectPaginatedAPI, iteratePaginatedAPI } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

// Initializing a client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getMarkdown(id) {
    // Get the markdown from a Notion page ID
    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString;
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