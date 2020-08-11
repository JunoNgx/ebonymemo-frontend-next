import Layout from "../../components/Layout"
import ReactMarkdown from "react-markdown"

const Game = ({game}) => (
    <Layout>
        <div className="page-game">
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
        android = (game.android == "redacted")
            ? "Redacted"
            : (<>
                <p className="panel__field">Android</p>
                <p className="panel__content"><a href={game.android}>{game.android}</a></p>
            </>)
    }

    if (!game.ios) {
        ios = ''
    } else {
        ios = (game.ios == "redacted")
            ? "Redacted"
            : (<>
                <p className="panel__field">iOS</p>
                <p className="panel__content"><a href={game.ios}>{game.ios}</a></p>
            </>)
    }

    return (
        <div className="panel panel--side">
            <p><strong>Game Information</strong></p>

            <p className="panel__field">Name</p>
            <p className="panel__content">{game.name}</p>
            <p className="panel__field">Release year</p>
            <p className="panel__content">{game.releaseYear}</p>
            {ios}
            {android}
        </div>
    )
}

function GameDesc({game}) {
    return (
        <div className="panel panel--middle">
            <img src={game.coverUrl}/>
            <div><ReactMarkdown source={game.description}/></div>
        </div>
    )
}

function DevPanel({dev}) {
    
    let personnel, website, twitter

    if (dev.personnel.length > 0) {
        personnel = (<>
            <p className="panel__field">Personnel</p>
            {dev.personnel.map((person)=>(
                <p className="panel__content">{person}</p>
            ))}
        </>)
    } else {
        personnel = ''
    }

    website = (dev.website)
        ? <>
            <p className="panel__field">Website</p>
            <p className="panel__content">{dev.website}</p>
        </>
        : ''

    twitter = (dev.twitter)
        ? <>
            <p className="panel__field">Twitter</p>
            <p className="panel__content">{dev.twitter}</p>
        </>
        : ''

    return (
        <div className="panel panel--side">
            <p><strong>Developer Information</strong></p>

            <p className="panel__field">Name</p>
            <p className="panel__content">{dev.name}</p>
            <p className="panel__field">Origin</p>
            <p className="panel__content">{dev.origin}</p>
            {personnel}
            {website}
            {twitter}
        </div>
    )
}