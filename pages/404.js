import React from 'react'
import Layout from "../components/Layout"
import Head from "next/head"

const PAGE_TITLE = "Ebony Memo | 404 - Page not found"

export default function Custom404() {
    return (
        <Layout>
            <Head>
                <title>{PAGE_TITLE}</title>
                <meta property="og:title" content={PAGE_TITLE} key="title"/>
            </Head>
            <div className="error-page">
                <div className="error-page__content">
                    <p>
                        To find enlightenment in your palm,<br/>
                        and measure infinity in pixels.<br/>
                        But to see nothing of your quaesitum,<br/>
                        and only a not found page of 404.<br/>
                    </p>
                    <p>In case you are still that confused, this is a 404 error page.</p>
                </div>
            </div>
        </Layout>
    )
}
