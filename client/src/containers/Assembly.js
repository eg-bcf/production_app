import React, { Component } from 'react';
import axios from 'axios';

import Line from '../components/assembly';

class Assembly extends Component {
  constructor() {
    super();
    this.state = {
      keys: {
        iterator: 0,
        values: []
      },
      items: {},
      intervalId: 0,
      currentCount: 5,
      viewState: '',
      viewIntervalId: 0,
      currentViewCount: 5,
    };

    this.fetchData = this.fetchData.bind(this);
    this.setViewState = this.setViewState.bind(this);
    this.timer = this.timer.bind(this)
    this.viewTimer = this.viewTimer.bind(this);
  }


  componentDidMount() {
    var intervalId = setInterval(this.timer, 300000);
    var viewIntervalId = setInterval(this.viewTimer, 30000)
    this.setState({intervalId: intervalId, currentCount: 5, viewIntervalId: viewIntervalId, currentViewCount: 5 });
    this.fetchData()
  }

  componentWillUnmount() {
     clearInterval(this.state.intervalId);
  }

  timer() {
    var newCount = this.state.currentCount - 1;
    if(newCount >= 0) {
        this.setState({ currentCount: newCount });
    } else {
        this.setState({currentCount: 300 });
        this.fetchData();
    }
  }

  fetchData = () => {
    return (//axios.get('http://api.bcfmanufacturing.com/manufacturing', {headers: {authorization: 'cschmidtbcf'}})
    axios.get('http://localhost:5001/manufacturing/assembly', {headers: {authorization: 'cschmidtbcf'}})
      .then((response) => {
        let res = JSON.parse(response.data)
        let resKeys = Object.keys(res)
        let currentKeyState = {...this.state.keys}
        currentKeyState.values = resKeys
        this.setState({
          items: res,
          keys: currentKeyState,
          viewState: resKeys[0]
        })
      })
      .catch(function (error) {
        console.log(error);
      }))
  }

  setViewState = (e, val) => {
    e.preventDefault();
    this.setState({
        viewState: val
    })
  }

  viewTimer = () => {
    let currentKeyState = {...this.state.keys}
    if (currentKeyState.iterator < currentKeyState.values.length-1) {
      currentKeyState.iterator += 1;
    }
    else {
      currentKeyState.iterator = 0;
    }
    this.setState({
      viewState: currentKeyState.values[currentKeyState.iterator],
      keys: currentKeyState
    })
  }

  render() {
    var headerStyle = {
      textAlign: 'center',
    }

    return (
      <div className="Shop">
        <h1 style={headerStyle}>Bio Chem Assembly Schedule</h1>
        <div className="row">
        { this.state.keys.values.length > 1 ?
          this.state.keys.values.map( val => {
            return(
              <div>
              <a className="waves-effect waves-light btn col s1"  value={val} onClick={(e) => this.setViewState(e, val)}>{val}</a>
              <div className="col s1"></div>
              </div>
            )
          })
        :
        <a className="waves-effect waves-light btn col s5" onClick={this.setLathes}>Loading...</a>
        }
        </div>
        { this.state.viewState !== '' ?
          <div>
            <h2 style={headerStyle}>{this.state.viewState}</h2>
            <Line items={this.state.items[this.state.viewState]}/>
          </div>
          :
          <div>
            <h2 style={headerStyle}>Loading...</h2>
          </div>
        }
      </div>
    );
  }
}

export default Assembly;
