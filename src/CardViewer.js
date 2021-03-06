import React from 'react';
import './CardViewer.css';

import {Link, withRouter} from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentIndex: 0,
          displayFront: true,
        };
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.cards !== prevProps.cards) {
          this.setState({ cards: this.props.cards });
        }
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
        if (!isLoaded(this.props.cards)) {
            console.log(this.props.cards)
            return <div>Loading...</div>;
        }

        if (isEmpty(this.props.cards)) {
            return <div>Page not found!</div>
        }
    
        const card = this.props.cards[this.state.currentIndex][
            this.state.displayFront ? "front" : "back"
        ];

        console.log(this.props.cards)

        return (
            <div>
                <h2>{this.props.name}</h2>
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
                <Link to="/">Home</Link>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    return { cards: cards, name: name };
}

export default compose(
    withRouter,
    firebaseConnect(props => {
        const deckId = props.match.params.deckId;
        return [{ path: `/Flashcards/${deckId}`, storeAs: deckId }];
    }),
    connect(mapStateToProps),
)(CardViewer);