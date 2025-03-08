import { getMarkdown } from './notionHelpers'
import { Client, collectPaginatedAPI, iteratePaginatedAPI } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

import fs from 'fs'

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getRecipeMarkdown(id, introId) {
    const recipeMdString = await getMarkdown(id);
    const introMdString = await getMarkdown(introId);
    // console.log({step: 'getRecipeMarkdown', introId: introId, introMdString: introMdString})
    return {
        recipeMd: recipeMdString,
        introMd: introMdString,
    }
}

function getPageIdFromDatabasePage(recipe) { 
    // console.log({
    //     step: 'getPageIdFromDatabasePageId', 
    //     recipe: JSON.stringify(recipe)
    // })
    // return recipe.properties.Name.title.find((obj) => {
    //     return obj.type === "mention"
    // }).mention.page.id
    return recipe.id
}

function getIntroPageIdFromDatabasePage(recipe) { // Only required for complete recipes
    return recipe.properties.Intro.rich_text.find((obj) => {
        return obj.type === "mention"
    }).mention.page.id
}

// returns an array
function getCategoryFromDatabasePage(recipe) {
    return recipe.properties.Category.multi_select.map((category) => {
        return category.name
    })
}

// returns an array
function getTagsFromDatabasePage(recipe) {
    return recipe.properties.Tags.multi_select.map((category) => {
        return category.name
    })
}

// function getSlugFromDatabasePage(recipe) { // Slug only required for completed recipes
//     return recipe.properties.Slug.rich_text.find((obj) => {
//         return obj.type === "text"
//     }).plain_text
// }

function getSlugFromDatabasePage(recipe) {
    // Check if recipe has properties, Slug property, and rich_text array
    if (!recipe.properties || 
        !recipe.properties.Slug || 
        !recipe.properties.Slug.rich_text || 
        recipe.properties.Slug.rich_text.length === 0) {
      return null;
    }
    
    // Find text object in rich_text array
    const textObj = recipe.properties.Slug.rich_text.find((obj) => {
      return obj.type === "text"
    });
    
    // Return null if no text object found, otherwise return plain_text
    return textObj ? textObj.plain_text : null;
  }

function getTitleFromDatabasePage(recipe) { // Introtitle  required for all recipes
    return recipe.properties.Name.title.find((obj) => {
        return obj.type === "mention" || obj.type === "text"
    }).plain_text
}

function getIntroTitleFromDatabasePage(recipe) { // Intro title only required for completed recipes
    return recipe.properties.Intro.rich_text.find((obj) => {
        return obj.type === "mention"
    }).plain_text
}

export async function queryRecipesDatabase(slug) {
    console.log(`Fetching ${slug} from Notion...`);
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
    const introPageId = getIntroPageIdFromDatabasePage(response.results[0])
    const category = getCategoryFromDatabasePage(response.results[0])
    const tags = getTagsFromDatabasePage(response.results[0])
    const title = getTitleFromDatabasePage(response.results[0])
    const introTitle = getIntroTitleFromDatabasePage(response.results[0])
    return getRecipeMarkdown(pageId, introPageId).then((md) => {
        return {
            id: pageId,
            introId: introPageId,
            category: category,
            tags: tags,
            slug: slug,
            title: title,
            introTitle: introTitle,
            introMarkdown: md.introMd,
            recipeMarkdown: md.recipeMd,
        }
    })
}

export async function getRecipesDatabase() {
    console.log('Fetching all recipes from Notion...');
    const response = await notion.databases.query({ database_id: process.env.NOTION_RECIPES_DB });
    // console.log({step: 'response', response: JSON.stringify(response.results)})
    const recipesWithMarkdown = await Promise.all(response.results.map((recipe) => {
        const slug = getSlugFromDatabasePage(recipe)
        const pageId = getPageIdFromDatabasePage(recipe)
        const category = getCategoryFromDatabasePage(recipe) // returns an array
        const tags = getTagsFromDatabasePage(recipe)
        const title = getTitleFromDatabasePage(recipe)
        // if a complete recipe:
        if (slug) {  
            const introPageId = getIntroPageIdFromDatabasePage(recipe)
            const introTitle = getIntroTitleFromDatabasePage(recipe)
            return getRecipeMarkdown(pageId, introPageId).then((md) => {
                return {
                    id: pageId,
                    introId: introPageId,
                    category: category,
                    tags: tags,
                    slug: slug,
                    title: title,
                    introTitle: introTitle,
                    recipeMarkdown: md.recipeMd,
                    introMarkdown: md.introMd,
                }
            })
        }
        // if an incomplete recipe:
        return {
            id: pageId,
            introId: null,
            category: category,
            tags: tags,
            slug: null,
            title: title,
            introTitle: null,
            recipeMarkdown: null,
            introMarkdown: null,
        }
        
    }))
    // console.log('Writing debug json...')
    // fs.writeFileSync('./recipe-debug.json', JSON.stringify(recipesWithMarkdown, null, 2));
    return recipesWithMarkdown;
}