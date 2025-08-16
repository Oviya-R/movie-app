import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

const Home = () => {

    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    useEffect(() => {

        let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=7f449821f4b37d79ffc34b6bb2d43eba`;
        
        if (search) {
            url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=7f449821f4b37d79ffc34b6bb2d43eba`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => setMovies(data.results))
    }, [page, search])

    return (
        <div className='p-4 pt-16'>
            <input onChange={(e) => setSearch(e.target.value)} className='p-2 w-3/4 md:1/2 border rounded border-gray-700 bg-gray-900 bg-opacity-60 backdrop:blur-md text-white fixed top-16 left-1/2 z-10 transform -translate-x-1/2' type="text" placeholder='Search Movies...' />
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
                {movies.map(movie => {
                    return (
                        <MovieCard key={movie.id} movie={movie} />
                    )
                })}

            </div>
            <div className="pagination-container flex justify-between  mt-5">
                <button disabled={page == 1} onClick={() => { setPage(prev => prev - 1) }} className='p-2 bg-gray-700 text-white rounded'>PREV</button>
                <button onClick={() => { setPage(prev => prev + 1) }} className='p-2 bg-gray-700 text-white rounded'>NEXT</button>
            </div>
        </div>
    )
}

export default Home
