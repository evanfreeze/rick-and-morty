import React, { Component } from 'react';
import './App.css';
import fetch from 'node-fetch';

function Character(props) {
  const { id, name, image, gender } = props
  return (
    <div key={id} className="character">
      <h1>{name}</h1>
      <img src={image} alt={name}/>
      <h2>{gender}</h2>
    </div>
  )
}

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
          {aliveCharacters.map(character => <Character {...character} key={character.id} />)}
        </div>
      );
    } else {
      return <h2>Loading...</h2>
    }
  }
}

export default App;
