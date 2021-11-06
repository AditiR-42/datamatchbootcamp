import { render } from '@testing-library/react';
import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import Homepage from './Homepage';

import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {front: 'Bonjour', back: 'Hello'},
      ],
      currentIndex: 0,
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

  render() {
    return (
      <Switch>
        <Route exact path="/homepage">
          <Homepage
            cards={this.state.cards}
          />
        </Route>
        <Route exact path="/editor">
          <CardEditor 
            addCard={this.addCard} 
            cards={this.state.cards} 
            deleteCard={this.deleteCard}
          />
        </Route>
        <Route exact path="/viewer">
          <CardViewer 
            cards={this.state.cards}
            displayFront={this.displayFront}
          />
        </Route>
      </Switch>
    );
  }
}

export default App;
