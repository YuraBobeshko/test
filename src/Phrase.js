import React from 'react';

class Phrase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phrase: null
    };
    this.phrase = this.phrase.bind(this);
  }
  async phrase () {
    const respons = await fetch('https://meowfacts.herokuapp.com/');
    const phrase = await respons.json();
    this.setState({phrase: phrase.data})
  }
  render(){
    if (this.state.phrase === null) {
      this.phrase();
    }
  return <p className={"phrase"}>{this.state.phrase}</p>;
  }

}

export default Phrase;