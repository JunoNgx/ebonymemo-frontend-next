import Layout from "../../components/Layout";
// import Link from "next/link"
import GameCard from "../../components/GameCard";
import { useState, useEffect } from "react";
// require('dotenv').config()

const gamePerPage = 2

export default function Browse({games, last_page}) {

    const [fetchedGames, setFetchedGames] = useState(games)
    // const [games2, setGames2] = useState([])
    const [pageCount, setPageCount] = useState(2)
    const [lastPage, setLastPage] = useState(last_page)
    const [isFetching, setIsFetching] = useState(false)
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")
    const [sortType, setSortType] = useState("dateAdded")
    const [sortOrder, setSortOrder] = useState("asc")

    useEffect(()=>{setIsFetching(false)}, [fetchedGames])

    async function loadMore() {
        setPageCount(prevCount => prevCount+1)
        // console.log(pageCount)
        if (pageCount === lastPage) setHasReachedLastPage(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${pageCount}`)
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${pageCount}`)

        const data = await res.json()
        const newGames = data.result
        // console.log(newGames)

        setFetchedGames(oldGames => [...oldGames, ...newGames])
        // setGames2(oldGames => [...oldGames, ...newGames])
    }

    return (
        <Layout>
            <div className="browse-page">
                <div className="browse-page__control">
                    <label className="browse-page__control--select">
                        <a>Sort by: </a>
                        <select className="browse-page__control--sort-type" value={sortType} onChange={(e)=>{setSortType(e.target.value)}} >
                            <option value="dateAdded">Date Added</option>
                            <option value="name">Name</option>
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
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                    <input className="browse-page__control--search" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}}placeholder="Search by game name here"/>                
                </div>
                <div className="browse-page__cards">
                    {fetchedGames.map((game) => (
                        <GameCard key={game.gameId} game={game}/>
                    ))}
                </div>
                <div className="browse-page__more">
                    {(isFetching)
                        ? <p>Loading. Please wait.</p>
                        : (hasReachedLastPage)
                            ? <p>There is no more data to show.</p>
                            : <p className="browse-page__more__button" onClick={loadMore}><a>Show more</a></p>
                    }
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps()  {
 
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=1`)
    const res = await fetch(`http://localhost:3001/.netlify/functions/server/games?limit=${gamePerPage}&page=1`)
    const data = await res.json()
    // const games = data.result

    return {
        props: {
            games: data.result,
            last_page: data.last_page
        },
        revalidate: 600
    }
}
