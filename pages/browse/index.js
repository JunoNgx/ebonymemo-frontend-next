import Layout from "../../components/Layout";
// import Link from "next/link"
import GameCard from "../../components/GameCard";
import { useState, useEffect } from "react";
// require('dotenv').config()

const gamePerPage = 2

export default function Browse({games, last_page}) {

    const [fetchedGames, setFetchedGames] = useState(games)
    const [pageCount, setPageCount] = useState(2)
    const [lastPage, setLastPage] = useState(last_page)
    const [isFetching, setIsFetching] = useState(false)
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false)

    const [sortBy, setSortBy] = useState("dateAdded")
    const [sortOrder, setSortOrder] = useState("asc")
    
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(()=>{setIsFetching(false)}, [fetchedGames])
    useEffect(()=>{refetch()}, [sortBy, sortOrder])

    async function queryFetch() {
        
        if (pageCount >= lastPage) setHasReachedLastPage(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${pageCount}`)
        console.log(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${pageCount}&sortBy=${sortBy}&sortOrder=${sortOrder}`)

        const data = await res.json()
        return data
    }

    async function refetch() {
        // console.log('refetch')
        setPageCount(1)
        setIsFetching(true)
        setFetchedGames([])
        console.log('page count:' + pageCount)

        const data = await queryFetch()
        console.log("from refetch")
        console.log(data)
        setFetchedGames(data.result)
        setLastPage(data.last_page)
    }

    function handleSortByChange(e) {
        setSortBy(e.target.value)
        // refetch()
    }

    function handleSortOrderChange(e) {
        setSortOrder(e.target.value)
        // refetch()
    }

    async function loadMore() {
        setIsFetching(true)
        setPageCount(prevCount => prevCount+1)
        // console.log(pageCount)

        const data = await queryFetch()
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
                        <select className="browse-page__control--sort-type" value={sortBy} onChange={handleSortByChange} >
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
                        <select className="browse-page__control--sort-order" value={sortOrder} onChange={handleSortOrderChange} >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                    <input className="browse-page__control--search" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value); refetch();}}placeholder="Search by game name here"/>                
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
 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=1`)
    // const res = await fetch(`http://localhost:3001/.netlify/functions/server/games?limit=${gamePerPage}&page=1`)
    const data = await res.json()
    // const games = data.result

    return {
        props: {
            games: data.result,
            last_page: data.last_page
        },
        revalidate: 300
    }
}
