import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { createElement, Fragment } from 'react'

import A from '../components/anchor'
import P from '../components/paragraph'
// import {parse} from 'remark-parse';
// import {remark2react} from 'remark-react';

export function getIdeasData() { 
    // const ideasDirectory = path.join(process.cwd(), 'data/ideas');
    const fullPath = path.join(process.cwd(), 'data', 'ideas', 'ideas.md')
    const ideasFileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(ideasFileContents)
    // https://github.com/rehypejs/rehype-react#when-should-i-use-this
    const content = unified()
        .use(rehypeParse)
        .use(rehypeReact, {
            createElement, Fragment,
            components: {
                a: A,
                p: P,
              }
        })
        .processSync(ideasFileContents).result;
        // .processSync(ideasFileContents).result;

    console.log("inside getIdeasData")
    console.log(content)

    const ideasData = {
        // TODO: parse markdown here!
        content,
        ...matterResult.data
    }
    // console.log(ideasData)
    return ideasData
}