// const { Client } = require("@notionhq/client")
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

export async function getAllRecipesAndCategories() {
    // Use this function to get all the data I care about
    
    function filterForPages(obj) {
        return Object.keys(obj).includes('child_page')
    }

    async function fetchRecipes(categoryId) {
        return await collectPaginatedAPI(notion.blocks.children.list, {
            block_id: categoryId,
        }).then(blocks => {
            return blocks.filter(filterForPages).map((block) => {
                const markdown = getRecipeMarkdown(block.id);
                return {
                    id: block.id,
                    parentId: block.parent.page_id,
                    title: block.child_page.title,
                    markdown: markdown,
                }
            })
        });
    }

    // Get top level categories from the root page
    const categories = await collectPaginatedAPI(notion.blocks.children.list, {
        block_id: 'c373d6b64c0340d1b5a0e622711870d6',
    }).then(blocks => {
        return blocks.filter(filterForPages).map((block) => {
            return {
                id: block.id,
                // pageId: block.parent.page_id,
                // keys: Object.keys(block).toString(),
                category: block.child_page.title,
                // object: JSON.stringify(block.object),
                // title: block.child_page.title,
            }
        })
    });

    return categories.map((category) => {
        const recipes = fetchRecipes(category.id);
        return {
            category: category.category,
            recipes: recipes,
        }
    });
}

export function getAllRecipeIds() {
    
    // Flatten the data structure and format it properly for Nextjs
    const allRecipes = getAllRecipesAndCategories();

    // const allRecipes = categories.map((category) => {
    //     return {
    //         params: {

    //         }
    //     } 
    // });
    
    return allRecipes;

    // return blocks.map((block) => {
    //     return {
    //         params: {
    //             id: block.id,
    //             title: block.child_page.title,
    //         }
    //     }
    // })

    // console.log("OH YEAH")
    // console.log(blocks)

    // Must return an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]

}



export async function getRecipeData(id) {
    const mdblocks = await n2m.pageToMarkdown('cba2b4d00b6d49c8b7d78f418f07828b');
    // const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
        id: id,
        markdown: mdString,
    }
}

export async function getRecipeBlocks() { 
    // TODO: use this function to get all the nice metadata for the /recipes page
    // TODO: Format it so that it'll be easy to categorize
    const blockId = '9c55f35c31644f748c7a11c5081ef810';
    const allBlocks = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 50,
    })

    return allBlocks.results;
};

    // const blockId = '9c55f35c31644f748c7a11c5081ef810';
    // const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
    //     block_id: blockId,
    //   }).then(blocks => {
    //     return blocks.map((block) => {
    //         return {
    //             ...block
    //         }
    //     })
    //   })
    // console.log(blocks)
    
    // const pageId = 'c373d6b64c0340d1b5a0e622711870d6';
    // const response = await notion.pages.retrieve({ page_id: pageId });


    // const blockId = '9c55f35c31644f748c7a11c5081ef810';
    // const allBlocks = await notion.blocks.children.list({
    //     block_id: blockId,
    //     page_size: 50,
    // }).then(blocks => {
    //     return blocks
    // });
    // console.log(allBlocks);
    // return allBlocks;

    // (async () => {
    //     const blockId = '9c55f35c31644f748c7a11c5081ef810';
    //     const response = await notion.blocks.children.list({
    //       block_id: blockId,
    //       page_size: 50,
    //     });
    //     console.log(response);
    //   })();
    // (async () => {
    //     const pageId = 'c373d6b64c0340d1b5a0e622711870d6';
    //     const response = await notion.pages.retrieve({ page_id: pageId });
    //     console.log("RESPONSE:")
    //     console.log(response);
    //     return response;
    //   })();

// };



// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';

// var GithubSlugger = require('github-slugger')
// var slugger = new GithubSlugger()

// const recipesDirectory = path.join(process.cwd(), 'data', 'recipes');

// export function getRecipesData() {

//     const dirNames = fs.readdirSync(recipesDirectory);
//     const allRecipesData = dirNames.map((dirName) => {
//         // Read all files in subdirectory
//         const dirPath =  path.join(recipesDirectory, dirName)
//         const fileNames = fs.readdirSync(dirPath);

//         // const recipesCategoryData = [];
//         var recipesCategoryData = fileNames.reduce((recipesCategoryData, fileName) => {

//             if (path.extname(fileName) === '.md') {
//                 // console.log('processing...')
//                 // Read markdown file as string
//                 const fullPath = path.join(recipesDirectory, dirName, fileName)
//                 const fileContents = fs.readFileSync(fullPath, 'utf8');    

//                 // Use gray-matter to parse the post metadata section
//                 const matterResult = matter(fileContents);
//                 recipesCategoryData.push({
//                     fileName: fileName,
//                     path: fullPath,
//                     slug: slugger.slug(matterResult.data.title),
//                     content: matterResult.content,
//                     ...matterResult.data,
//                 });
//             }
//             return recipesCategoryData
//         }, []);

        
//         return {
//             category: dirName,
//             data: recipesCategoryData,
//         }
        
//     });

//     // console.log('ALL RECIPES DATA')
//     // console.log(allRecipesData)
//     return allRecipesData;
// }