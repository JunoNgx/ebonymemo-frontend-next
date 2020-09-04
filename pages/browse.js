import { useState, useEffect, useRef } from "react"
import Head from "next/head"
import { PageTransition } from "next-page-transitions"

import Layout from "../components/Layout"
import GameCard from "../components/GameCard"

const PAGE_TITLE = "Ebony Memo | Catalogue"
const DEFAULT_GAME_PER_PAGE = 8
const DEFAULT_SORT_BY = "dateAdded"
const DEFAULT_SORT_ORDER = "desc"

export default function Browse({preFetchedGames, preFetchedLastPage}) {

    const [fetchedGames, setFetchedGames] = useState(preFetchedGames)
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(preFetchedLastPage)
    const [isFetching, setIsFetching] = useState(false)
    
    const isTriggeredFromSortOptions = useRef(false)
    const isUsingPrefetchedGamesDataOnly = useRef(true)

    const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY)
    const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_ORDER)
    const [gamePerPage, setgamePerPage] = useState(DEFAULT_GAME_PER_PAGE)
    const [searchName, setSearchName] = useState("")

    // Shorthand functions
    async function concatenateFetchResults() {
        // console.log('perform fetch')
        setIsFetching(true);
        const FETCH_URL = `${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchName=${searchName}`
        console.log(FETCH_URL)
        const res = await fetch(FETCH_URL)
        const data = await res.json()

        setLastPage(data.last_page)
        setFetchedGames(oldGames => [...oldGames, ...data.result])
    }
    function reFetch() {
        setFetchedGames([])
        // If currentPage is already 1, the useEffect for it won't be triggered as the value doesn't changed
        if (currentPage !== 1) {
            setCurrentPage(1)
        } else {
            // Go straight to the fetch function without using the trigger via currentPage
            concatenateFetchResults()
        }
    }

    useEffect(()=>{
        // Preventing the first fetch upon initial render, it was already done by server-side
        if (!isUsingPrefetchedGamesDataOnly.current) {
            concatenateFetchResults()
        }
    }, [currentPage])

    useEffect(()=>{
        if (isTriggeredFromSortOptions.current) {
            isTriggeredFromSortOptions.current = false
            reFetch()
        }
    }, [sortOrder, sortBy, gamePerPage])

    useEffect(()=>{
        if (fetchedGames.length > 0) setIsFetching(false)
    }, [fetchedGames])

    function handleShowMoreClick() {
        setCurrentPage(prevCount => prevCount + 1)
        isUsingPrefetchedGamesDataOnly.current = false
    }
    
    function handleSortByChange(e) {
        setSortBy(e.target.value)
        isTriggeredFromSortOptions.current = true
        isUsingPrefetchedGamesDataOnly.current = false
    }
    
    function handleSortOrderChange(e) {
        setSortOrder(e.target.value)
        isTriggeredFromSortOptions.current = true
        isUsingPrefetchedGamesDataOnly.current = false
    }

    function handleGamePerPageChange(e) {
        setgamePerPage(e.target.value)
        isTriggeredFromSortOptions.current = true;
        isUsingPrefetchedGamesDataOnly.current = false;
    }

    function handleSearchSubmission() {
        reFetch()
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
                            <option value="featured">Editor's Choice</option>
                            <option value="random">Random</option>
                            <option value="developer">Developer</option>
                            <option value="name">Name</option>
                            <option value="releaseYear">Release Year</option>
                            <option value="other">Other Release</option>
                        </select>
                    </label>
                    <label className="browse-page__control--select">
                        <a>Sort order: </a>
                        <select className="browse-page__control--sort-order" value={sortOrder} onChange={handleSortOrderChange} >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                    <label className="browse-page__control--select">
                        <a>Amount per page: </a>
                        <select className="browse-page__control--amt-per-page" value={gamePerPage} onChange={handleGamePerPageChange}>
                            <option value={8}>8</option>
                            <option value={16}>16</option>
                            <option value={32}>32</option>
                            <option value={64}>64</option>
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

export async function getStaticProps()  {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${DEFAULT_GAME_PER_PAGE}&page=1&sortBy=${DEFAULT_SORT_BY}&sortOrder=${DEFAULT_SORT_ORDER}`)
    const data = await res.json()

    return {
        props: {
            preFetchedGames: data.result,
            preFetchedLastPage: data.last_page
        },
        revalidate: 600
    }
}