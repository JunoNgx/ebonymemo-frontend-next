import Head from 'next/head'
import Link from 'next/link'
// import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import GameCard from '../components/GameCard'

export default function Home ({featuredGames}) {

    // const randomIndex = Math.floor(Math.random() * featuredGames.length)
    // const randomFeaturedGame = featuredGames[randomIndex]
    const randomFeaturedGame = featuredGames[Math.floor(Math.random() * featuredGames.length)]

    // const keys = Object.keys(featuredGames)
    // const randomIndex = Math.floor(Math.random() * keys.length)
    // const randomFeaturedGame = featuredGames[randomIndex]

    // console.log(randomFeaturedGame)
    // const featuredGames = games.filter(game => game.featured)
    // console.log(featuredGames)
    return (
        <Layout>
            <div className="landing-page">
                <div className="landing-page__intro">
                    <h1>Videogames are art.</h1>
                    <p>On computers, XBox, PlayStation, Famicom, GameCube, Wii, DS, Switch, and <strong>smartphones</strong>.</p>
                    <p>Welcome to <strong>{"{Ebony Memo}"}</strong>, a videogame currator website exclusively for titles on smartphone devices. </p>
                    <div className="landing-page__intro__cta-block">
                        <p className="landing-page__intro__cta-block__cta"><Link href="/manifesto"><a>Read the manifesto</a></Link></p>
                        <p className="landing-page__intro__cta-block__cta"><Link href="/browse"><a>Browse the collection</a></Link></p>
                    </div>
                </div>
                <div className="landing-page__feature">
                    <p className="landing-page__feature__title"><h2>Random feature:</h2></p>
                    <GameCard game={randomFeaturedGame}/>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${process.env.API_URL}/games`)
    const data = await res.json()
    const games = data.result
    const featuredGames = games.filter(game => game.featured)

    return {
        props: {
            featuredGames
        }
    }
}