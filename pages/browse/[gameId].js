import Layout from "../../components/Layout"
import ReactMarkdown from "react-markdown"

const Game = ({game}) => (
    <Layout>
        <div>
            {/* <div className="dev-panel">
                Developer infos

                Name: {game.developer.name}
                Origin: {game.developer.origin}
                {(game.developer.twitter) && `Twitter: ${game.developer.twitter}`}
                {(game.developer.website) && `Twitter: ${game.developer.website}`}
                {(game.developer.website) && `Twitter: ${game.developer.website}`}
                {(game.developer.personnel.length > 0) && `Personnel${}`}
            </div> */}
            <DevPanel dev={game.developer}/>
            <div className="content-panel">
                <img src={game.coverUr}/>
                Released in {game.releaseYear}

                <a href="">Android</a>
                <a href="">iOS</a>

                <div><ReactMarkdown source={game.description}/></div>
            </div>
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

function DevPanel({dev}) {

    return (
        <div>
            <p><strong>Developer Information</strong></p>
            Name: {dev.name}
            Origin: {dev.origin}
            
        </div>
    )
}