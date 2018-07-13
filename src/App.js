import React, { Component } from 'react';
import './App.css';
import fetch from 'node-fetch';

function Card(props) {
  const { id, name, image, gender, species } = props
  const manaCost = 3;
  const health = 10;
  const damage = 5;
  return (
    <div key={id} className="card">
      <div className="card-header">
        <h1>{name}</h1>
        <h3>{manaCost}</h3>
      </div>
      <img src={image} alt={name}/>
      <div className="species-details">
        <h2>{species} ({gender})</h2>
      </div>
      <div className="card-details">
        <h2>Damage</h2>
        <h2>{damage}</h2>
        <h2>Health</h2>
        <h2>{health}</h2>
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

    fetch(`https://rickandmortyapi.com/api/character/?page=${Math.floor(Math.random() * 25) + 1}`)
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
