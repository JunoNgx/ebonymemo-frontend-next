import Layout from "../../components/Layout";
import GameCard from "../../components/GameCard";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const gamePerPage = 4

export default function Browse() {

    const router = useRouter()

    const [fetchedGames, setFetchedGames] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(2)
    
    const isTriggeredFromSortOptions = useRef(false)

    const [isFetching, setIsFetching] = useState(false)

    const [sortBy, setSortBy] = useState("dateAdded")
    const [sortOrder, setSortOrder] = useState("asc")
    
    const [searchName, setSearchName] = useState("")

    // Shorthand function
    async function performFetch() {
        console.log('perform fetch')
        setIsFetching(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchName=${searchName}`)
        // console.log(`${process.env.NEXT_PUBLIC_API_URL}/games/?limit=${gamePerPage}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
        const data = await res.json()

        // console.log(data)
        setLastPage(data.last_page)

        setFetchedGames(oldGames => [...oldGames, ...data.result])
    }
    function prepareNewFetch() {
        setFetchedGames([])
        // If currentPage is 1, the hook for it won't be triggered as the value isn't changed
        if (currentPage !== 1) {setCurrentPage(1)} else {performFetch()}
    }

    useEffect(()=>{
        performFetch()
    }, [currentPage])

    useEffect(()=>{
        if (isTriggeredFromSortOptions.current) {

            isTriggeredFromSortOptions.current = false
            console.log('sort option changed')
            prepareNewFetch()
        }
    }, [sortOrder, sortBy])

    // Update UI status when fetching is completed
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
        prepareNewFetch()
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
                    <input className="browse-page__control--search" value={searchName} onChange={(e)=>{setSearchName(e.target.value)}} onKeyPress={(e)=>{if (e.key === 'Enter') handleSearchSubmission()}}placeholder="Search by game name here"/>                
                </div>
                <div className="browse-page__cards">
                    {fetchedGames.map((game) => (
                        <GameCard key={game.gameId} game={game}/>
                    ))}
                </div>
                <div className="browse-page__more">
                    {(isFetching)
                        ? <p>Loading. Please wait.</p>
                        : (currentPage >= lastPage)
                            ? <p>There is no more data to show.</p>
                            : <p className="browse-page__more__button" onClick={handleShowMoreClick}><a>Show more</a></p>
                    }
                </div>
            </div>
        </Layout>
    )
}