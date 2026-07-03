import Head from 'next/head'
import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.PUBLIC_GA_ID || 'G-WT67VH6M3R'

export default function Header ({ children, canonicalHref, noindex }) {
    return(
        <>
            <Head>
                <title>{children ? `Anthony W. Baker | ${children}` : `Anthony W. Baker`}</title>
                <link rel="icon" href="/favicon-512x512.png" />
                {canonicalHref && <link rel="canonical" href={canonicalHref} />}
                {noindex && <meta name="robots" content="noindex" />}
            </Head>

            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script id="gtag-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
                `}
            </Script>

            <Script id="heap-init" strategy="afterInteractive">
                {`window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};heap.load(${process.env.HEAP_ENV});`}
            </Script>
        </>
    )
}