import React from 'react';
import './Homepage.css';

import {Link} from 'react-router-dom';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div>
                <h2>Homepage</h2>
                <hr />
                <Link to="/editor">Go to Card Editor</Link>
                <hr />
                <Link to="/viewer">Go to Card Viewer</Link>
            </div>
        );  
    }
}

export default Homepage;