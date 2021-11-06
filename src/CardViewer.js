import React from 'react';
import './CardViewer.css';

import {Link} from 'react-router-dom';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentIndex: 0,
          displayFront: true,
        };
    }

    nextCard = () => {
        if (this.state.currentIndex < this.props.cards.length - 1) {
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                displayFront: true,
            });
        }
    };

    previousCard = () => {
        if (this.state.currentIndex > 0) {
            this.setState({
                currentIndex: this.state.currentIndex - 1,
                displayFront: true,
            });
        }
    };

    flipCard = () => this.setState({displayFront: !this.state.displayFront});
  
    render() {
    const card = this.props.cards[this.state.currentIndex][
        this.state.displayFront ? "front" : "back"
    ];

    console.log(this.props.cards)

    return (
      <div>
        <h2>Card Viewer</h2>
        <h4>Card: {this.state.currentIndex + 1} / {this.props.cards.length}</h4>
        <div className="card" onClick={this.flipCard}>
            {card}
        </div>
        <br />
        <button
            disabled={this.state.currentIndex === 0}
            onClick={this.previousCard}
        >
            Previous Card
        </button>
        <button
            disabled={this.state.currentIndex === this.props.cards.length - 1}
            onClick={this.nextCard}
        >
            Next Card
        </button>
        <hr />
        <Link to="/editor">Go to Card Editor</Link>
        <hr />
        <Link to="/homepage">Homepage</Link>
      </div>
    );
  }
}

export default CardViewer;
