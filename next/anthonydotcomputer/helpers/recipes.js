import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

var GithubSlugger = require('github-slugger')
var slugger = new GithubSlugger()

const recipesDirectory = path.join(process.cwd(), 'data', 'recipes');

export function getRecipesData() {

    const dirNames = fs.readdirSync(recipesDirectory);
    const allRecipesData = dirNames.map((dirName) => {
        // Read all files in subdirectory
        const dirPath =  path.join(recipesDirectory, dirName)
        const fileNames = fs.readdirSync(dirPath);

        // const recipesCategoryData = [];
        var recipesCategoryData = fileNames.reduce((recipesCategoryData, fileName) => {

            if (path.extname(fileName) === '.md') {
                console.log('processing...')
                // Read markdown file as string
                const fullPath = path.join(recipesDirectory, dirName, fileName)
                const fileContents = fs.readFileSync(fullPath, 'utf8');    

                // Use gray-matter to parse the post metadata section
                const matterResult = matter(fileContents);
                recipesCategoryData.push({
                    fileName: fileName,
                    path: fullPath,
                    slug: slugger.slug(matterResult.data.title),
                    content: matterResult.content,
                    ...matterResult.data,
                });
            }
            return recipesCategoryData
        }, []);

        
        return {
            category: dirName,
            data: recipesCategoryData,
        }
        
    });

    console.log('ALL RECIPES DATA')
    console.log(allRecipesData)
    return allRecipesData;
}