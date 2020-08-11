import Layout from "../components/Layout";
import Link from "next/link"
// require('dotenv').config()

const Browse = ({games}) => (
    <Layout>
        {games.map((game) => (
            <p key={game.gameId}><Link href={`/browse/${game.gameId}`}><a>{game.name}</a></Link> is made by {game.developer.name}</p>
        ))}
    </Layout>
)

export default Browse

export async function getStaticProps()  {
    // console.log(`${process.env.API_URL}/games/`)

    const res = await fetch(`${process.env.API_URL}/games/`)
    // const res = await fetch("https://scythian-rect-mrt-viking.netlify.app/.netlify/functions/server/games/")
    const data = await res.json()
    const games = data.result

    return {
        props: {
            games,
            // revalidate: 1200
        }
    }
}
