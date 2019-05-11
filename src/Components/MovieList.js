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
        let arr = [];

        // it will make 40 request becuase of limit and store the results into an array
        for(let i=1; i< 39; i++){
            const movieData = await axios.get('https://api.themoviedb.org/3/trending/movie/day',{
                params : {
                    api_key : TORONTO_MOVIE_FEST_API_KEY,
                    language,
                    page: i
                }
            });

            const { results } = movieData.data;
            let data = results.filter(index => {
                let year2019 = new Date(index.release_date).getFullYear();
                if( year2019 === 2019 && index.original_language == 'en') {
                    arr.push(index);
                    return arr
                }
            });
        }

        // sort the movie by releasing date
        arr.sort(function(a, b){
            let date1 = new Date(a.release_date),date2 = new Date(b.release_date)
            return date1 - date2
        });

        this.setState({
            movies: arr
        }); 
    }

    renderLoader() {
        return <p> ...Loading </p>
    }
    SelectedMovie = async(ID, e) => {
        let flag = document.getElementById(ID);
        let ans = flag.hasChildNodes();
        // Render Cast Container only once.
        if(!ans){
            const cast = await axios.get(`https://api.themoviedb.org/3/movie/${ID}/credits`,{
                params : {
                    api_key: TORONTO_MOVIE_FEST_API_KEY
                }
            });
    
            const castHTML = cast.data.cast.map( item => {
            const {character, id, name, profile_path:castimg } = item;
                // Display Cast only if Image source is available
                if(castimg){
                    return(
                        `<span>
                            <img src="https://image.tmdb.org/t/p/w66_and_h66_face/${castimg}"
                            alt="${name}" title="${name}"/>
                        </span>`
                    );
                }
            });
            let castHeader = document.createElement('h4');
            castHeader.innerText ='Cast:';
            document.getElementById(ID).appendChild(castHeader);
    
            let castContainer = document.createElement('div');
            castContainer.innerHTML = castHTML;
            document.getElementById(ID).appendChild(castContainer);
        }


       // e.target.removeEventListner(e.type);
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
                    <div key= {id} className= "movieCard"
                        onClick = {
                            (e) => {
                                this.SelectedMovie(id, e); 
                            }
                        }
                    >
                        <div className="imgDiv">
                            <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${image}`} alt="" />
                        </div>
                        <div className="contentDiv" >
                            <h2 className="movieName"> Movie Name: { movieName }</h2>
                            <h4> Release Date: { release_date } </h4>
                            <h4> Popularity: { popularity }</h4>
                            <p><span className="description">Description:</span> { description }</p>
                            <div id={id}></div>
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
                <h2> -:Here's The List Of Movie:- </h2>
                <div className= "movieList">
                    {
                        this.state.movies.length
                        ? this.renderMovies()
                        : this.renderLoader()
                    }   
                </div>
                <input type="button" value="load more..." onClick={this.loadmore}/>
            </section>
        )
    }
}

export default MovieList;