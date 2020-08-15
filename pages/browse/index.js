import Layout from "../../components/Layout";
// import Link from "next/link"
import GameCard from "../../components/GameCard";
import { useState } from "react";
// require('dotenv').config()

export default function Browse({games}) {

    const [stateGames, setStateGames] = useState(games)
    const [searchQuery, setSearchQuery] = useState("")
    const [sortType, setSortType] = useState("dateAdded")
    const [sortOrder, setSortOrder] = useState("asc")

    return (
        <Layout>
            <div className="browse-page">
                <div className="browse-page__control">
                    <input className="browse-page__control--search" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}}placeholder="Search for game name here"/>                
                    <label className="browse-page__control--select">
                        <a>Sort by: </a>
                        <select className="browse-page__control--sort-type" value={sortType} onChange={(e)=>{setSortType(e.target.value)}} >
                            <option value="name">Name</option>
                            <option value="dateAdded">Date Added</option>
                            <option value="releaseYear">Release Year</option>
                            <option value="developer">Developer</option>
                            <option value="other">Other Release</option>
                            <option value="featured">Editor's Choice</option>
                        </select>
                    </label>
                    <label className="browse-page__control--select">
                        <a>Sort order: </a>
                        <select className="browse-page__control--sort-order" value={sortOrder} onChange={(e)=>{setSortOrder(e.target.value)}} >
                            <option value="asc">Ascending</option>
                            <option value="des">Descending</option>
                        </select>
                    </label>
                </div>
                <div className="browse-page__cards">
                    {stateGames.map((game) => (
                        <GameCard key={game.gameId} game={game}/>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

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
