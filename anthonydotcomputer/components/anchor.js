import Link from 'next/link'

export default function A({ children, href, className }) {
  return(
    <Link href={href} passHref> 
      <a className={className}>{ children }</a>
    </Link>
  )
}
