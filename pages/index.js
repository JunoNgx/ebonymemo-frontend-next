import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { PageTransition } from "next-page-transitions"

import Layout from '../components/Layout'
import GameCard from '../components/GameCard'

const PAGE_TITLE = "Ebony Memo | Welcome"

export default function Home ({featuredGames}) {

    const [randomIndex, setRandomIndex] = useState(undefined)
    
    useEffect(()=>{
        setRandomIndex(Math.floor(Math.random() * featuredGames.length))
    }, [featuredGames])

    return (
        <Layout>
            <Head>
                <title>{PAGE_TITLE}</title>
                <meta property="og:title" content={PAGE_TITLE} key="title"/>
            </Head>
            <PageTransition key="page-trans" timeout={500} classNames="page-transition">
                {/* Workaround to probably a bug in next-page-transitions*/}
                <div key="transit-area">
                    <div className="landing-page">
                        <div className="landing-page__intro">
                            <img className="landing-page__intro__hero-banner" src="/phonebox.gif"/>
                            <div className="landing-page__intro__content">
                                <h1 className="landing-page__intro__content__header">Videogames are art.</h1>
                                <p>On computers, XBox, PlayStation, Famicom, GameCube, Wii, DS, Switch, and <strong>smartphones</strong>.</p>
                                <p>Welcome to <strong>{"{Ebony Memo}"}</strong>, an arthouse videogame curator website exclusively for mobile devices. </p>
                                <div className="landing-page__intro__content__cta-block">
                                    <p className="landing-page__intro__content__cta-block__cta"><Link href="/manifesto"><a>Read the manifesto</a></Link></p>
                                    <p className="landing-page__intro__content__cta-block__cta"><Link href="/browse"><a>Browse the collection</a></Link></p>
                                </div>
                            </div>
                        </div>
                        {(randomIndex !== undefined)
                            ? (
                                <div className="landing-page__feature">
                                    <div className="landing-page__feature__title">
                                        <h2>Random feature:</h2>
                                    </div>
                                    <GameCard game={featuredGames[randomIndex]}/>
                                </div>
                                )
                            : ''
                        }
                    </div>
                </div>
            </PageTransition>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`)
    const data = await res.json()
    const games = data.result
    const featuredGames = games.filter(game => game.featured)

    return {
        props: {
            featuredGames
        },
        revalidate: 600
    }
}