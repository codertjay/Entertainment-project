import React , {
    useState ,
    useEffect
} from 'react';
import { Container , Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Row from './Row'
import requests from './requests'
import Banner from './Banner'
import Nav from './Nav'
import './Movie.css'

const Movie = () => {


    return (
        <div className={'movie'}>
            <Nav/>
            <Banner/>
            <Row title={'NETFLIX ORIGINALS '}
                 fetchUrl={requests.fetchTrending} isLargeRow/>
            <Row title={'TRENING NOW '}
                 fetchUrl={requests.fetchNetflixOriginals}/>
            <Row title={'Top Rated '}
                 fetchUrl={requests.fetchTopRated}/>
            <Row title={'Action Movies '}
                 fetchUrl={requests.fetchActionMovies}/>
            <Row title={'Comedy Movies'}
                 fetchUrl={requests.fetchComedyMovies}/>
            <Row title={' Horror Movies'}
                 fetchUrl={requests.fetchHorrorMovies}/>
            <Row title={'Romance Movies  '}
                 fetchUrl={requests.fetchRomanceMovies}/>
            <Row title={'Documentaries'}
                 fetchUrl={requests.fetchDocumentaries}/>
        </div>
    )
}

export default Movie;