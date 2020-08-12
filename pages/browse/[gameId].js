import Layout from "../../components/Layout"
import ReactMarkdown from "react-markdown"

const Game = ({game}) => (
    <Layout>
        <div className="game-page">
            <GamePanel game={game}/>
            <GameDesc game={game}/>
            <DevPanel dev={game.developer}/>
        </div>
    </Layout>
)

export default Game

export async function getStaticPaths() {
    const res = await fetch(`${process.env.API_URL}/games/`)
    const data = await res.json()
    const games = data.result

    const paths = games.map((game) => ({
        params: {gameId: game.gameId}
    }))

    return {paths, fallback: false}
}

export async function getStaticProps({params}) {
    const res = await fetch(`${process.env.API_URl}/games/${params.gameId}`)
    const data = await res.json()
    const game = data.result

    return { props: {game}}
}

function GamePanel({game}) {
    let android, ios

    // Formatting optional information that might not be available
    if (!game.android) {
        android = ''
    } else {
        android = (game.android === "redacted")
            ? "Redacted"
            : (<>
                <p className="game-page__panel__field">Android</p>
                <p className="game-page__panel__value"><a href={game.android} target="_blank">Link</a></p>
            </>)
    }

    if (!game.ios) {
        ios = ''
    } else {
        ios = (game.ios === "redacted")
            ? "Redacted"
            : (<>
                <p className="game-page__panel__field">iOS</p>
                <p className="game-page__panel__value"><a href={game.ios} target="_blank">Link</a></p>
            </>)
    }

    return (
        <div className="game-page__panel game-page__panel--game">
            <p><strong>Game Information</strong></p>

            <p className="game-page__panel__field">Name</p>
            <p className="game-page__panel__value">{game.name}</p>
            <p className="game-page__panel__field">Release year</p>
            <p className="game-page__panel__value">{game.releaseYear}</p>
            {ios}
            {android}
        </div>
    )
}

function GameDesc({game}) {
    return (
        <div className="game-page__panel game-page__panel--desc">
            <img src={game.coverUrl}/>
            <div><ReactMarkdown source={game.description}/></div>
        </div>
    )
}

function DevPanel({dev}) {
    
    let personnel, website, twitter

    if (dev.personnel.length > 0) {
        personnel = (<>
            <p className="game-page__panel__field">Personnel</p>
            {dev.personnel.map((person)=>(
                <p className="game-page__panel__value">{person}</p>
            ))}
        </>)
    } else {
        personnel = ''
    }

    website = (dev.website)
        ? <>
            <p className="game-page__panel__field">Website</p>
            <p className="game-page__panel__value"><a href={dev.website} target="_blank">{dev.website}</a></p>
        </>
        : ''

    twitter = (dev.twitter)
        ? <>
            <p className="game-page__panel__field">Twitter</p>
            <p className="game-page__panel__value"><a href={`https://twitter.com/${dev.twitter}`} target="_blank">@{dev.twitter}</a></p>
        </>
        : ''

    return (
        <div className="game-page__panel game-page__panel--dev">
            <p><strong>Developer Information</strong></p>

            <p className="game-page__panel__field">Name</p>
            <p className="game-page__panel__value">{dev.name}</p>
            <p className="game-page__panel__field">Origin</p>
            <p className="game-page__panel__value">{dev.origin}</p>
            {personnel}
            {website}
            {twitter}
        </div>
    )
}