import Head from 'next/head'

export default function Header ({ children }) {
    return(
        <Head>
            {children ? (
                <title>{`Anthony W. Baker | ${children}`}</title>
            ) : (
                <title>Anthony W. Baker</title>
            )}
            <link rel="icon" href="/favicon-512x512.png" />
        </Head>
    )
}