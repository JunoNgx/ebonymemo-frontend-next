import { useRouter } from "next/router"
import Head from "next/head"
import ReactMarkdown from "react-markdown"
import PageTransition from "next-page-transitions/lib/PageTransition"

import Layout from "../../components/Layout"
import { STRINGS } from "../../components/Strings"

export default function GamePage({game}){

    const router = useRouter()

    return (
        <Layout>
            {(router.isFallback)
                ? (<div className="game-page">
                    <div className="game-page--loading">
                        <p>Loading. Please wait.</p>
                    </div>
                </div>)
                : (<PageTransition timeout={500} classNames="page-transition">
                    <>
                        <Head>
                            <title>{`Ebony Memo | ${game.name} by ${game.developer.name}`}</title>
                            <meta property="og:title" content={`Ebony Memo | ${game.name}`} key="title"/>
                        </Head>
                        <div className="game-page">
                            <GamePanel game={game}/>
                            <GameDesc game={game}/>
                            <DevPanel dev={game.developer}/>
                        </div>
                    </>
                </PageTransition>)
            }
        </Layout>
    )
}

async function getFetchResult(_url) {
    const res = await fetch(_url)
    const data = await res.json()
    return data.result
}

export async function getStaticPaths() {
    
    const games = await getFetchResult(`${process.env.NEXT_PUBLIC_API_URL}/games/`);
    const paths = games.map((game) => ({
        params: {gameId: game.gameId}
    }))

    return {paths, fallback: true}
}

export async function getStaticProps({params}) {

    const game = await getFetchResult(`${process.env.NEXT_PUBLIC_API_URL}/games/${params.gameId}`)
    return {
        props: {
            game
        },
        revalidate: 600
    }
}

function GamePanel({game}) {
    let android, ios

    // Formatting optional information that might not be available
    if (!game.android) {
        android = ''
    } else {
        android = (game.android === "delisted")
            ? (<>
                <p className="game-page__panel__field">Android release</p>
                <p className="game-page__panel__value"><em>{STRINGS.DELISTED_ANDROID}</em></p>
            </>)
            : (<>
                <p className="game-page__panel__field">Android release</p>
                <p className="game-page__panel__value"><a href={game.android} rel="noopener" target="_blank">Link</a></p>
            </>)
    }

    if (!game.ios) {
        ios = ''
    } else {
        ios = (game.ios === "delisted")
            ? (<>
                <p className="game-page__panel__field">iOS release</p>
            <p className="game-page__panel__value"><em>{STRINGS.DELISTED_IOS}</em></p>
            </>)
            : (<>
                <p className="game-page__panel__field">iOS release</p>
                <p className="game-page__panel__value"><a href={game.ios} rel="noopener" target="_blank">Link</a></p>
            </>)
    }

    return (
        <div className="game-page__panel game-page__panel--game">
            <p className="game-page__panel__title">Game information</p>
            <p className="game-page__panel__field">Name</p>
            <p className="game-page__panel__value">{game.name}</p>
            <p className="game-page__panel__field">Release year</p>
            <p className="game-page__panel__value">{game.releaseYear}</p>
            {ios}
            {android}
            {(game.featured) && <>
                <p className="game-page__panel__field">Editor's Choice</p>
                <p className="game-page__panel__value">{STRINGS.FEATURED_BADGE}</p>
            </>}
            {(game.other) && <>
                <p className="game-page__panel__field">Alternative release</p>
                <p className="game-page__panel__value">{STRINGS.OTHER}</p>
            </>}
        </div>
    )
}

function GameDesc({game}) {
    const router = useRouter()
    return (
        <div className="game-page__panel game-page__panel--desc">
            <img src={game.coverUrl}/>
            <div><ReactMarkdown children={game.description}/></div>
            <p className="game-page__panel__button"><a onClick={()=>router.back()}>Back</a></p>
        </div>
    )
}

function DevPanel({dev}) {
    
    let personnel

    if (dev.personnel.length > 0) {
        personnel = (<>
            <p className="game-page__panel__field">Key personnel</p>
            {dev.personnel.map((person)=>(
                <p className="game-page__panel__value" key={person}>{person}</p>
            ))}
        </>)
    } else {
        personnel = ''
    }

    return (
        <div className="game-page__panel game-page__panel--dev">
            <p className="game-page__panel__title">Developer information</p>
            <p className="game-page__panel__field">Name</p>
            <p className="game-page__panel__value">{dev.name}</p>
            <p className="game-page__panel__field">Origin</p>
            <p className="game-page__panel__value">{dev.origin}</p>
            {personnel}
            {(dev.website) && <>
                <p className="game-page__panel__field">Website</p>
                <p className="game-page__panel__value"><a href={dev.website} rel="noopener" target="_blank">{(dev.website.length > 24) ? "Link" : dev.website}</a></p>
            </>}
            {(dev.twitter) && <>
                <p className="game-page__panel__field">Twitter</p>
                <p className="game-page__panel__value"><a href={`https://twitter.com/${dev.twitter}`} rel="noopener" target="_blank">@{dev.twitter}</a></p>
            </>}
        </div>
    )
}