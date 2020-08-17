import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { PageTransition } from "next-page-transitions"

import Layout from '../components/Layout'
import GameCard from '../components/GameCard'

const PAGE_TITLE = "Ebony Memo | Welcome"

export default function Home ({featuredGames}) {

    const [randomIndex, setRandomIndex] = useState(undefined)

    // const randomIndex = Math.floor(Math.random() * featuredGames.length)
    // const randomFeaturedGame = featuredGames[randomIndex]
    // const randomFeaturedGame = featuredGames[Math.floor(Math.random() * featuredGames.length)]

    // const keys = Object.keys(featuredGames)
    // const randomIndex = Math.floor(Math.random() * keys.length)
    // const randomFeaturedGame = featuredGames[randomIndex]

    // console.log(randomFeaturedGame)
    // const featuredGames = games.filter(game => game.featured)
    // console.log(featuredGames)
    useEffect(()=>{
        setRandomIndex(Math.floor(Math.random() * featuredGames.length))
    }, [featuredGames])

    console.log(randomIndex)
    // console.log(featuredGames[randomIndex].name)

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
                            <h1>Videogames are art.</h1>
                            <p>On computers, XBox, PlayStation, Famicom, GameCube, Wii, DS, Switch, and <strong>smartphones</strong>.</p>
                            <p>Welcome to <strong>{"{Ebony Memo}"}</strong>, an arthouse videogame curator website exclusively for mobile devices. </p>
                            <div className="landing-page__intro__cta-block">
                                <p className="landing-page__intro__cta-block__cta"><Link href="/manifesto"><a>Read the manifesto</a></Link></p>
                                <p className="landing-page__intro__cta-block__cta"><Link href="/browse"><a>Browse the collection</a></Link></p>
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
        }
    }
}