// const { Client } = require("@notionhq/client")
import { Client, collectPaginatedAPI } from '@notionhq/client'


// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function getRecipeBlocks() { 
    const blockId = '9c55f35c31644f748c7a11c5081ef810';
    const allBlocks = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 50,
    })
    // console.log(allBlocks.results)

    return allBlocks.results;

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

};



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