import Head from 'next/head'

export default function Header ({ children }) {
    return(
        <Head>
            <title>{children ? `Anthony W. Baker | ${children}` : `Anthony W. Baker`}</title>
            <link rel="icon" href="/favicon-512x512.png" />
        </Head>
    )
}