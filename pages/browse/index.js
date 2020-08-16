import Layout from "../../components/Layout";
// import Link from "next/link"
import GameCard from "../../components/GameCard";
import { useState, useEffect, useRef } from "react";
// require('dotenv').config()

const gamePerPage = 4

export default function Browse({games, last_page}) {

    const [fetchedGames, setFetchedGames] = useState(games)
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(last_page)
    
    const isOnInitialRender = useRef(true)
    const isTriggeredFromLMBtn = useRef(false)
    const isTriggeredFromSortOptions = useRef(false)

    const [isFetching, setIsFetching] = useState(false)
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false)

    const [sortBy, setSortBy] = useState("dateAdded")
    const [sortOrder, setSortOrder] = useState("asc")
    
    const [searchQuery, setSearchQuery] = useState("")


    async function fetchWithQuery() {
        setIsFetching(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
        // console.log(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
        const data = await res.json()

        setLastPage(data.last_page)
        return data
    }

    // Update UI status when fetching is completed
    useEffect(()=>{setIsFetching(false)}, [fetchedGames])

    useEffect(() => {
        // Fetch new data when user clicks on Show More
        async function loadMore() {
            isTriggeredFromLMBtn.current = false

            // console.log('loadMore() is ran')
            // console.log('Currently on page: ' + currentPage + ' ouf of ' + lastPage)
            if (currentPage >= lastPage) setHasReachedLastPage(true)

            const data = await fetchWithQuery()
            const newGames = data.result
            setFetchedGames(oldGames => [...oldGames, ...newGames])
        }
        if (!isOnInitialRender.current && isTriggeredFromLMBtn.current) loadMore()
    }, [currentPage, isTriggeredFromLMBtn.current])

    useEffect(()=> {
        // Clear current games
        async function configureForNewSort() {
            // console.log('configureForNewSort()')
            isTriggeredFromSortOptions.current = true
            // isTriggeredFromLMBtn.current = false
            setHasReachedLastPage(false)
            setFetchedGames([])

            // Will trigger the useEffect with currentPage as dependency
            setCurrentPage(1)
        }
        if (!isOnInitialRender.current) configureForNewSort()
    }, [sortBy, sortOrder])

    useEffect(()=>{
        // Refetch upon change in sorting option
        async function fetchForNewSort() {
            isTriggeredFromSortOptions.current = false

            // console.log('fetchForNewSort()')

            const data = await fetchWithQuery()
            const newGames = data.result
            setFetchedGames(oldGames => [...oldGames, ...newGames])
        }
        if (!isOnInitialRender.current && isTriggeredFromSortOptions.current) fetchForNewSort()
        // console.log('isTriggeredFromSort: ' + isTriggeredFromSortOptions.current)
    }, [currentPage, isTriggeredFromSortOptions.current])

    function handleShowMoreClick() {
        
        // if (currentPage >= lastPage) {
        //     setHasReachedLastPage(true)
        // } else {
        //     setCurrentPage(prevCount => prevCount + 1)
        // } 
        // console.log('Show More is clicked')
        setCurrentPage(prevCount => prevCount + 1)
        isOnInitialRender.current = false
        isTriggeredFromLMBtn.current = true
    }

    
    function handleSortByChange(e) {
        setSortBy(e.target.value)
        isOnInitialRender.current = false
        // refetch()
    }

    function handleSortOrderChange(e) {
        setSortOrder(e.target.value)
        isOnInitialRender.current = false
        // refetch()
    }

    // async function queryFetch() {

    //     setCurrentPage(prevCount => prevCount+1)
    //     console.log('page count++')
    //     if (currentPage >= lastPage) setHasReachedLastPage(true)

    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
    //     console.log(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`)

    //     const data = await res.json()
    //     return data
    // }

    // async function refetch() {
    //     // console.log('refetch')
    //     // setPageCount(1)
    //     setFetchedGames([])
    //     setCurrentPage(1)
    //     setIsFetching(true)
    //     // setFetchedGames([])
    //     // console.log('page count:' + pageCount)

    //     const data = await queryFetch()
    //     // console.log("from refetch")
    //     // console.log(data)
    //     setFetchedGames(data.result)
    //     setLastPage(data.last_page)
    // }

    // async function loadMore() {
    //     setIsFetching(true)
    //     // setCurrentPage(prevCount => prevCount+1)
    //     // console.log(pageCount)

    //     const data = await queryFetch()
    //     const newGames = data.result
    //     // console.log(newGames)

    //     setFetchedGames(oldGames => [...oldGames, ...newGames])
    //     // setGames2(oldGames => [...oldGames, ...newGames])
    // }


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
                            : <p className="browse-page__more__button" onClick={handleShowMoreClick}><a>Show more</a></p>
                    }
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps()  {
 
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=1&sortBy=dateAdded&sortOrder=asc`)
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
