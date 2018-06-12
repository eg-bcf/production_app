import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

import Shop from './Shop';
import Assembly from './Assembly';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    var headerStyle = {
      textAlign: 'center',
    }

    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/shop" component={Shop} />
            <Route path="/assembly" component={Assembly} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
