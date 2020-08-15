import Layout from "../components/Layout";
// import Link from "next/link"
import GameCard from "../components/GameCard";
// require('dotenv').config()

const Browse = ({games}) => (
    <Layout>
        <div className="browse-page">
            {games.map((game) => (
                <GameCard key={game.gameId} game={game}/>
            ))}
        </div>
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
        },
        revalidate: 600
    }
}
