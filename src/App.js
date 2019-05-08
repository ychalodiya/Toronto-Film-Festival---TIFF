import React, { Component } from 'react';
import './App.css';

// importing components
import Header from './Components/Header';
import Footer from './Components/Footer';
import MovieList from './Components/MovieList';

// https://api.themoviedb.org/3/movie/550?api_key=d1533d4ca4c407672b61788a01df4c08

class App extends Component {
  constructor() {
    super();
    this.state = {
      Selected_Movie_ID : null
    };
  }

  render() {
    return (
      <div>
        <main>
          <Header title= "Toronto Movie Festival" message= "Browse you're favorite movie from here." />
          <main>
            <MovieList />
          </main>
          <Footer />
        </main>
      </div>
    );
  }
}

export default App;
