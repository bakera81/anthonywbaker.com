import P from './paragraph'
import List from './list'
import MarkdownImage from './markdownImage'

import ReactMarkdown from 'react-markdown'

import styles from './markdown.module.css'


export default function Markdown({ children }) {
    return(
          <ReactMarkdown
          // Note: any custom components will not properly render it's children, like <i> or <b>
            components={{
              h1: ({node, ...props}) => ( 
                <h1 className="title is-4" {...props} /> 
              ),
              h2: ({node, ...props}) => ( 
                <h2 className="title is-5" {...props} /> 
              ),
              p: ({ node, ...props }) => (
                <P style={{ textAlign: `left` }} {...props} />
              ),
              ul: ({ node, ...props }) => (
                <List style={{ textAlign: `left` }} {...props} />
              ),
              ol: ({ node, ...props }) => (
                <List ordered style={{ textAlign: `left` }} {...props} />
              ),
              img: ({ node, ...props }) => (
                <MarkdownImage src={props.src} {...props} />
              ),
              blockquote: ({node, ...props}) => (
                <blockquote className={styles.blockquote} {...props} />
              ),
            }}
          >
            {children}
          </ReactMarkdown>
    )
};