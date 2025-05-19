import Head from 'next/head'
import Script from 'next/script'

export default function Header ({ children, canonicalHref }) {
    return(
        <Head>
            {/* <Script
                id="heap"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
                    heap.load("XXX");
                `,
                }}
            /> */}
            <title>{children ? `Anthony W. Baker | ${children}` : `Anthony W. Baker`}</title>
            <link rel="icon" href="/favicon-512x512.png" />
            {canonicalHref && <link rel="canonical" href={canonicalHref} />}
            <script type="text/javascript">
                {`window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
                heap.load(${process.env.HEAP_ENV});`}  
            </script>
        </Head>
    )
}