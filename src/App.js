import React, { Component } from 'react';
import './App.css';
import fetch from 'node-fetch';

function Card(props) {
  const { id, name, image, gender, species } = props
  return (
    <div key={id} className="card">
      <div className="card-header">
        <img src={image} alt={name}/>
        <h1>{name}</h1>
      </div>
      <div className="card-details">
        <h2>Gender</h2>
        <h2>{gender}</h2>
        <h2>Species</h2>
        <h2>{species}</h2>
      </div>
    </div>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      characters: [],
      statusToShow: 'Alive',
    }
    this.updateStatus = this.updateStatus.bind(this)
  }

  componentDidMount() {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => this.setState({
        characters: data.results,
        isLoaded: true,
      }))
  }

  updateStatus(statusToShow) {
    this.setState({ statusToShow })
  }

  render() {
    const aliveCharacters = this.state.characters.filter(character => character.status === this.state.statusToShow)
    console.log(aliveCharacters)
    if (this.state.isLoaded) {
      return (
        <div className="App">
          <div className="cards">
            {aliveCharacters.map(character => <Card {...character} key={character.id} />)}
          </div>
        </div>
      );
    } else {
      return <h2>Loading...</h2>
    }
  }
}

export default App;
