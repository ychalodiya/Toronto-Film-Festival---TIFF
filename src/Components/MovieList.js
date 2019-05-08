import React, { Component } from 'react';
import axios from 'axios';

const TORONTO_MOVIE_FEST_API_KEY = process.env.REACT_APP_TORONTO_MOVIE_FEST_API_KEY;
const language = 'en-US';

class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
    }

    componentDidMount() {
        // requesting data using the following function
        this.getMovieData();
    }

    async getMovieData() {
        const page = 1;
        const movieData = await axios.get('https://api.themoviedb.org/3/trending/movie/day',{
            params : {
                api_key : TORONTO_MOVIE_FEST_API_KEY,
                language,
                page
            }
        });
        // console.log(movieData.data);
        const { results } = movieData.data;
        console.log(results)
        this.setState({
            movies: results
        })
    }

    renderLoader() {
        return <p> ...Loading </p>
    }

    renderMovies() {
        const { movies } = this.state;

        const movieHTML = movies.map( item => {
            const { 
                original_title: movieName,
                overview: description,
                popularity,
                release_date,
                poster_path: image,
                id
            } = item;

            return(
                <div 
                    key= {id}
                    className= "movieCard"
                >
                <h2> Movie Name: { movieName }</h2>
                <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${image}`} alt="" />
                <h4> Release Date: { release_date } </h4>
                <h4> Popularity: { popularity }</h4>
                <p> Description: { description }</p>
                </div>
            );
        });
        return movieHTML;
    }

    render() {
        return (
            <section className= "movieListComponent">
                <h2> Here's The Movie List </h2>
                <div className= "movieList">
                    {
                        this.state.movies.length
                        ? this.renderMovies()
                        : this.renderLoader()
                    }   
                </div>
            </section>
        )
    }

}
export default MovieList;