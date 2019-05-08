import React, { Component } from 'react';
import './MovieList.css';

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
        let arr = [];
        const { results } = movieData.data;
        let data = results.filter(i => {
            let year2019 = new Date(i.release_date).getFullYear();
            if( year2019 === 2019) {
                arr.push(i);
                return arr
            }
        });

        console.log(data);

        this.setState({
            movies: arr
        }); 
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

            // if popularity is less than 10 than it's won't render the data
            if(popularity > 10) {
                return(
                    <div 
                        key= {id}
                        className= "movieCard"
                        onClick = {() => {
                            this.props.setSelectedMovie(id)
                        }}
                    >
                    <div className="imgDiv">
                        <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${image}`} alt="" />
                    </div>
                    <div className="contentDiv">
                        <h2 className="movieName"> Movie Name: { movieName }</h2>
                        <h4> Release Date: { release_date } </h4>
                        <h4> Popularity: { popularity }</h4>
                        <p><span className="description">Description:</span> { description }</p>
                    </div>
                    </div>
                );
            }
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