import { Client, collectPaginatedAPI, iteratePaginatedAPI } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getRecipeMarkdown(id) {

    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString;
}

function getBlocks(id) {
    const blocks = collectPaginatedAPI(notion.blocks.children.list, {
        block_id: id,
      })
    return blocks;
}

function getPageIdFromDatabasePage(recipe) {
    // console.log({
    //     step: 'getPageIdFromDatabasePageId', 
    //     recipe: JSON.stringify(recipe)
    // })
    return recipe.properties.Name.title.find((obj) => {
        return obj.type === "mention"
    }).mention.page.id
}

function getCategoryFromDatabasePage(recipe) {
    return recipe.properties.Category.select.name
}

function getSlugFromDatabasePage(recipe) {
    return recipe.properties.Slug.rich_text.find((obj) => {
        return obj.type === "text"
    }).plain_text
}

function getTitleFromDatabasePage(recipe) {
    return recipe.properties.Name.title.find((obj) => {
        return obj.type === "mention"
    }).plain_text
}

export async function queryRecipesDatabase(slug) {
    const response = await notion.databases.query({ 
        database_id: process.env.NOTION_RECIPES_DB,
        filter: {
            property: "Slug",
            rich_text: {
                equals: slug
            }
        } 
    });
    // console.log({step: 'queryRecipesDatabase', response: JSON.stringify(response.results[0])})
    const pageId = getPageIdFromDatabasePage(response.results[0])
    const category = getCategoryFromDatabasePage(response.results[0])
    const title = getTitleFromDatabasePage(response.results[0])
    return getRecipeMarkdown(pageId).then((md) => {
        return {
            id: pageId,
            category: category,
            slug: slug,
            title: title,
            markdown: md,
        }
    })
    
}

export async function getRecipesDatabase() {
    const response = await notion.databases.query({ database_id: process.env.NOTION_RECIPES_DB });
    // console.log({step: 'response', response: JSON.stringify(response.results)})
    const recipesWithMarkdown = await Promise.all(response.results.map((recipe) => {
        const pageId = getPageIdFromDatabasePage(recipe)
        const category = getCategoryFromDatabasePage(recipe)
        const slug = getSlugFromDatabasePage(recipe)
        const title = getTitleFromDatabasePage(recipe)
        return getRecipeMarkdown(pageId).then((md) => {
            return {
                id: pageId,
                category: category,
                slug: slug,
                title: title,
                markdown: md,
            }
        })
    }))
    return recipesWithMarkdown;
}