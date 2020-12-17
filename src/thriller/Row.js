import React , { Component , useEffect , useState } from 'react';
import { Typography , Grid } from "@material-ui/core";
import axios from './axios'
import { createStyles , makeStyles , Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import './Row.css'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'


const base_url = "https://image.tmdb.org/t/p/original"

const Row = ({title , fetchUrl , isLargeRow}) => {
    const [movies , setMovies] = useState ([])
    const [trailerUrl , setTrailerUrl] = useState ('')

    useEffect (() => {

        async function fetchData () {
            console.log ('working 1`')
            const request = await axios.get (fetchUrl)
            console.log (request)
            setMovies (request.data.results)
            return request;
            console.log ('working')
        }

        fetchData ();
    } , [fetchUrl])

    const opts = {
        height: "390" ,
        width: "100%" ,
        playerVars: {
            autoplay: 1 ,
        } ,
    }

    console.log (movies)

    const handleClick = (movie) => {
        console.log ('calling',movie)
        console.log ('calling movie?.name',movie?.title)
        if (trailerUrl) {
            setTrailerUrl ('');
        } else {
            movieTrailer (movie?.title || movie?.original_title || "")
                .then (url => {
                    console.log ('the first url',url)
                    const urlParams = new URLSearchParams (new URL(url).search)
                    console.log ('the url params',urlParams)
                    console.log ('the url params video',urlParams.get('v'))
                    setTrailerUrl (urlParams.get ('v'));
                    console.log ('it worked url ',trailerUrl)
                }).catch (error => {
                console.error (error)
                console.log ('there was an error')
            })
        }
    }

    return (
        <div className={'row'}>

            <Typography variant="h6">{title}</Typography>

            <div className="row__posters">
                {movies.map ((movie , index) => (
                    <img key={index}
                         onClick={() => handleClick (movie)}
                         className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                         src={`${base_url}${isLargeRow ? movie.poster_path :
                             movie.backdrop_path}`}
                         alt={movie.name}/>
                ))}

            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;