import { getMarkdown } from './notionHelpers'
import { Client, collectPaginatedAPI, iteratePaginatedAPI } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

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

function getIntroPageIdFromDatabasePage(recipe) {
    // console.log({
    //     step: 'getIntroPageIdFromDatabasePageId', 
    //     recipe: JSON.stringify(recipe)
    // })
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

function getSlugFromDatabasePage(recipe) {
    return recipe.properties.Slug.rich_text.find((obj) => {
        return obj.type === "text"
    }).plain_text
}

function getTitleFromDatabasePage(recipe) {
    // return recipe.properties.Name.title.find((obj) => {
    //     return obj.type === "mention"
    // }).plain_text
    return recipe.properties.Name.title.find((obj) => {
        return obj.type === "mention" || obj.type === "text"
    }).plain_text
}

function getIntroTitleFromDatabasePage(recipe) {
    // return recipe.properties.Name.title.find((obj) => {
    //     return obj.type === "mention"
    // }).plain_text
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
        const pageId = getPageIdFromDatabasePage(recipe)
        const introPageId = getIntroPageIdFromDatabasePage(recipe)
        const category = getCategoryFromDatabasePage(recipe) // returns an array
        const tags = getTagsFromDatabasePage(recipe)
        const slug = getSlugFromDatabasePage(recipe)
        const title = getTitleFromDatabasePage(recipe)
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
    }))
    return recipesWithMarkdown;
}