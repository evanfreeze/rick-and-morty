import React, { Component } from 'react';
import './App.css';
import fetch from 'node-fetch';

function Character(props) {
  const { id, name, image, gender, species } = props
  return (
    <div key={id} className="character">
      <div className="character-header">
        <img src={image} alt={name}/>
        <h1>{name}</h1>
      </div>
      <div className="character-details">
        <h2>Gender</h2>
        <h2>{gender}</h2>
        <h2>Species</h2>
        <h2>{species}</h2>
      </div>
    </div>
  )
}

/* 

  {
    "id": 183,
    "name": "Johnny Depp",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
      "name": "Earth (C-500A)",
      "url": "https://rickandmortyapi.com/api/location/23"
    },
    "location": {
      "name": "Earth (C-500A)",
      "url": "https://rickandmortyapi.com/api/location/23"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/183.jpeg",
    "episode": [
      "https://rickandmortyapi.com/api/episode/8"
    ],
    "url": "https://rickandmortyapi.com/api/character/183",
    "created": "2017-12-29T18:51:29.693Z"
  }

  */

function Button(props) {
  return <button onClick={() => props.clickFunction(props.buttonText)}>{props.buttonText.toUpperCase()}</button>
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
          <Button clickFunction={this.updateStatus} buttonText="Dead" />
          <Button clickFunction={this.updateStatus} buttonText="Alive" />
          <Button clickFunction={this.updateStatus} buttonText="unknown" />
          <div className="characters">
            {aliveCharacters.map(character => <Character {...character} key={character.id} />)}
          </div>
        </div>
      );
    } else {
      return <h2>Loading...</h2>
    }
  }
}

export default App;
