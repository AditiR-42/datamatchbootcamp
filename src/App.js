import { render } from '@testing-library/react';
import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {front: 'Bonjour', back: 'Hello'},
      ],
      currentIndex: 0,
      editor: true,
    };
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({cards});
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    if (index > 0) {
      cards.splice(index, 1);
      this.setState({cards}); 
    }
    else {
      alert('Cannot delete all cards!');
      return;
    }
  }
  
  switchMode = () => this.setState({editor: !this.state.editor});

  render() {
    if (this.state.editor) {
      return (<CardEditor 
      addCard={this.addCard} 
      cards={this.state.cards} 
      deleteCard={this.deleteCard}
      switchMode={this.switchMode}
      />);
    }
    else {
      return (<CardViewer 
      switchMode={this.switchMode}
      cards={this.state.cards}
      displayFront={this.displayFront}
      />);
    }
  }
}

export default App;
