import { useState, useEffect, useRef } from "react"
// import { useRouter } from "next/router"
import Head from "next/head"
import { PageTransition } from "next-page-transitions"

import Layout from "../../components/Layout"
import GameCard from "../../components/GameCard"

const PAGE_TITLE = "Ebony Memo | Catalogue"
const GAME_PER_PAGE = 8

export default function Browse() {

    const [fetchedGames, setFetchedGames] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(2)
    const [isFetching, setIsFetching] = useState(false)
    
    const isTriggeredFromSortOptions = useRef(false)

    const [sortBy, setSortBy] = useState("dateAdded")
    const [sortOrder, setSortOrder] = useState("desc")
    const [searchName, setSearchName] = useState("")

    // Shorthand functions
    async function performFetch() {
        // console.log('perform fetch')
        setIsFetching(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${GAME_PER_PAGE}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchName=${searchName}`)
        // console.log(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${GAME_PER_PAGE}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
        const data = await res.json()

        setLastPage(data.last_page)
        setFetchedGames(oldGames => [...oldGames, ...data.result])
    }
    function conditionedPerformFetch() {
        setFetchedGames([])
        // If currentPage is already 1, the useEffect for it won't be triggered as the value doesn't changed
        if (currentPage !== 1) {setCurrentPage(1)} else {performFetch()}
    }

    useEffect(()=>{
        performFetch()
    }, [currentPage])

    useEffect(()=>{
        if (isTriggeredFromSortOptions.current) {
            isTriggeredFromSortOptions.current = false
            conditionedPerformFetch()
        }
    }, [sortOrder, sortBy])

    useEffect(()=>{
        if (fetchedGames.length > 0) setIsFetching(false)
    }, [fetchedGames])

    function handleShowMoreClick() {
        setCurrentPage(prevCount => prevCount + 1)
    }
    
    function handleSortByChange(e) {
        setSortBy(e.target.value)
        isTriggeredFromSortOptions.current = true
    }
    
    function handleSortOrderChange(e) {
        setSortOrder(e.target.value)
        isTriggeredFromSortOptions.current = true
    }

    function handleSearchSubmission() {
        conditionedPerformFetch()
    }

    return (
        <Layout>
            <Head>
                <title>{PAGE_TITLE}</title>
                <meta property="og:title" content={PAGE_TITLE} key="title"/>
            </Head>
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
                    <input className="browse-page__control--search" value={searchName} onChange={(e)=>{setSearchName(e.target.value)}} onKeyPress={(e)=>{if (e.key === 'Enter') handleSearchSubmission()}}placeholder="Search by game name here"/>                
                </div>
                <div className="browse-page__cards">
                    {fetchedGames.map((game) => (
                        <PageTransition key={game.gameId} timeout={500} classNames="page-transition">
                            <GameCard key={game.gameId} game={game}/>
                        </PageTransition>
                    ))}
                </div>
                <div className="browse-page__more">
                    {(isFetching)
                        ? <p>Loading. Please wait.</p>
                        : (currentPage >= lastPage)
                            ? <p>Everything is already here.</p>
                            : <p className="browse-page__more__button" onClick={handleShowMoreClick}><a>Show more</a></p>
                    }
                </div>
            </div>
        </Layout>
    )
}