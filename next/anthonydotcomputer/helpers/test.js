import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function testGetIdeasData() {

// Read markdown file as string
const fullPath = path.join(process.cwd(), 'data', 'ideas', 'ideas.md')
const fileContents = fs.readFileSync(fullPath, 'utf8');

// Use gray-matter to parse the post metadata section
const matterResult = matter(fileContents);

return {
    content: fileContents,
    ...matterResult.data,
  };

}