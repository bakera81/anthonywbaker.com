import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { stringify } from 'rehype-stringify';
import { createElement, Fragment } from 'react'

import A from '../components/anchor'
import P from '../components/paragraph'

// import { stringify } from 'querystring';
// import {parse} from 'remark-parse';
// import {remark2react} from 'remark-react';

export function getIdeasData() { 
    // const ideasDirectory = path.join(process.cwd(), 'data/ideas');
    const fullPath = path.join(process.cwd(), 'data', 'ideas', 'ideas.md')
    const ideasFileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(ideasFileContents)
    // https://github.com/rehypejs/rehype-react#when-should-i-use-this
    const content = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, {
            createElement, Fragment,
            components: {
                a: A,
                p: P,
              }
        })
        .use(stringify)
        .processSync(ideasFileContents).result

    console.log("inside getIdeasData")
    console.log(content)

    const ideasData = {
        // TODO: parse markdown here!
        // content: content,
        ideasFileContents: ideasFileContents,
        ...matterResult.data
    }
    // console.log(ideasData)
    return ideasData
}