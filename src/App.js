import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Request from 'superagent'
import _ from 'lodash';

class App extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      users: [],
    }
  }

  componentWillMount(){
    //Called the first time the component is loaded right before the component is added to the page
    this.search();
  }

  componentDidMount() {
    //Called after the component has been rendered into the page
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
  }

  componentWillReceiveProps(nextProps){
    //Called when the props provided to the component are changed
  }

  componentWillUpdate(nextProps, nextState){
    //Called when the props and/or state change
  }

  componentWillUnmount(){
    //Called when the component is removed
  }

  updateSearch() {
    this.search(this.refs.query.value);
  }

  render() {

    var flex = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }

    var lila = {
      padding: '5px',
      margin: '5px',
      background: 'red',
      boxSizing: 'borderBox',
    }

    var {isLoaded, items, users} = this.state;

    var movies = _.map(this.state.movies, (movie) => {
      return <li>{movie.title}</li>;
      console.log("hola")
    });
      return (


        
        <div className="App">
          <h1>PLACEHOLDER</h1>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name} -- {item.email}
              </li>
            ))} 
          </ul>
          
          <br/><br/>

          <h1>omdbapi.com</h1>

          <ul style={flex}>
            {
              movies.map(movie => {
                return  <li style={lila}>
                          <p>{movie.Title}</p>
                          <p>{movie.Year}</p>
                          <img src={movie.Poster} alt=""/>
                        </li>
              })
            } 
          </ul>

          <div className="">
            <input ref="query" onChange={ (e) => { this.updateSearch(); } } type="text"/>
          </div>

          
        </div>
      );
    
  }

  search(query = "star") {
    var url = `http://www.omdbapi.com/?s=${query}&y=&r=json&plot=short&apikey=a237ceb0`;

    Request.get(url).then((res) => {
      this.setState ({
        movies: res.body.Search,
        total: res.body.totalResults
      })
      console.log(res)
    });
  }

}

export default App;
