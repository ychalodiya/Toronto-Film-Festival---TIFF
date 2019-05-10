import React, { Component } from 'react';
import './App.css';

// importing components
import Header from './Components/Header';
import Footer from './Components/Footer';
import MovieList from './Components/MovieList';
import MovieCard from './Components/MovieCard';

// https://api.themoviedb.org/3/movie/550?api_key=d1533d4ca4c407672b61788a01df4c08

class App extends Component {
  constructor() {
    super();
    this.state = {
      Selected_Movie_ID : null
    };
  }
  setSelectedMovie = (movieID) => {
    // console.log(movieID);
    this.setState({
      Selected_Movie_ID: movieID
    });
  }

  render() {
    return (
      <div>
        <main>
          <Header title= "Toronto International Film Festival" />
          <main>
            <MovieList setSelectedMovie = { this.setSelectedMovie }/>
            {/* <MovieCard Selected_Movie_ID = { this.state.Selected_Movie_ID }/> */}
          </main>
          <Footer />
        </main>
      </div>
    );
  }
}

export default App;
