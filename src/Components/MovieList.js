import React, { Component } from 'react';
import './MovieList.css';
import axios from 'axios';

const TORONTO_MOVIE_FEST_API_KEY = process.env.REACT_APP_TORONTO_MOVIE_FEST_API_KEY;
const language = 'en-US';
let arr =[];

class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            start: 1
        };
    }

    componentDidMount() {
        // requesting data using the following function
        this.getMovieData(this.state.start);
    }
    
    async getMovieData(start) {
        // it will make 40 request becuase of limit and store the results into an array

        for(let i=start; i< start+39; i++) {
            const movieData = await axios.get(`https://api.themoviedb.org/3/discover/movie`,{
                params : {
                    api_key: TORONTO_MOVIE_FEST_API_KEY,
                    page: i,
                    language,
                    sort_by: 'primary_release_date.asc',
                    'primary_release_date.gte': '2019-01-01',
                    with_original_language: 'en',
                    'primary_release_date.lte':'2019-12-31'
                }
            });

            const { results } = movieData.data;
            let data = results.filter(index => {
                    arr.push(index);
                    return arr   
            });
        }
        document.getElementById('loadmore').style.visibility = 'visible';
        this.setState({
            movies: arr,
            start: start + 39
        });   
    }

    renderLoader() {
        return <p> ...Loading </p>
    }

    // It will convert minutes into hours and minutes
    runtimeConverter(time) {
        let hours = (time / 60);
        let roundedHours = Math.floor(hours);
        let minutes = (hours - roundedHours) * 60;
        let roundedMinutes = Math.round(minutes);
        return roundedHours + " Hour(s) and "+ roundedMinutes + " minute(s)";
    }

    SelectedMovie = async ID => {
        let flag = document.getElementById(ID);
        let ans = flag.hasChildNodes();

        // Render Cast Container only once.
        if(!ans){
            const cast = await axios.get(`https://api.themoviedb.org/3/movie/${ID}/credits`,{
                params : {
                    api_key: TORONTO_MOVIE_FEST_API_KEY
                }
            });

            const tagline_and_runtime = await axios.get(`https://api.themoviedb.org/3/movie/${ID}`,{
                params : {
                    api_key : TORONTO_MOVIE_FEST_API_KEY,
                    language
                }
            });

            const {tagline, runtime, genres, overview, release_date} = tagline_and_runtime.data;
            
            this.createContainer('Release Date: ', release_date, ID);
            this.createContainer('Description: ', overview, ID);
            this.createContainer('Tagline: ', tagline, ID);

            let timer = this.runtimeConverter(runtime);
            this.createContainer('Runtime: ', timer, ID);
            
            const genreHTML = genres.map( item => {
                return  item.name;
            }).join(", ");

            this.createContainer('Genres: ', genreHTML, ID);

            const castHTML = cast.data.cast.map( item => {
            const {name, profile_path:castimg } = item;
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
            castContainer.innerHTML = castHTML.join(" ");
            document.getElementById(ID).appendChild(castContainer);
        }
    }

    createContainer = (title, data, ID) => {

        let lable = document.createElement('h4');
        lable.innerText = title;
        document.getElementById(ID).appendChild(lable);

        let lableData = document.createElement('span');
        lableData.innerHTML = data;
        lable.appendChild(lableData);
    }

    loadmore = () => {
        document.getElementById('loadmore').style.visibility = 'hidden';
        console.log(this.state.start);
        this.getMovieData(this.state.start);
    }

    renderMovies() {
        const { movies } = this.state;
        const movieHTML = movies.map((item, ) => {
        const { 
            original_title: movieName,
            popularity,
            poster_path: image,
            id
        } = item;

            // if popularity is less than 10 than it's won't render the data
            if(popularity > 10) {
                return(
                    <div key= {id} className= "movieCard"
                        onClick = {
                            () => {
                                this.SelectedMovie(id); 
                            }
                        }
                    >
                        <div className="imgDiv">
                            <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${image}`} alt="" />
                        </div>
                        <div className="contentDiv" >
                            <h2 className="movieName"> Movie: { movieName }</h2>
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
                <button id="loadmore" value="load more..." onClick={this.loadmore}>Load More Movies</button>
            </section>
        )
    }
}

export default MovieList;