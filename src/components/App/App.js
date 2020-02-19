import React, { Component } from 'react';
import './App.scss';
import Nav from '../Nav/Nav';
import LoadingPage from '../LoadingPage/LoadingPage';
import Homepage from '../Homepage/Homepage';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { loadMovies } from '../../actions';
// { !this.state.movies.length && <LoadingPage /> }
// { this.state.movies.length && <Homepage /> }

class App extends Component {
  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movieData => {
        this.props.loadMoviesToStore(movieData.movies)
      })
  }

  render() {
    return (
      <div className="app">
        <Nav />
        <LoadingPage />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadMoviesToStore: (movies) => { dispatch(loadMovies(movies)) }
});

const mapStateToProps = state => ({
  movies: state.movies,
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
