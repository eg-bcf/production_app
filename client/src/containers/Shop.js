import React, { Component } from 'react';
import axios from 'axios';

import Mills from '../components/mills';
import Lathes from '../components/lathes';

class Shop extends Component {
  constructor() {
    super();
    this.state = {
      mills: [],
      lathes: [],
      intervalId: 0,
      currentCount: 5,
      viewState: 'MILLS'
    };

    this.fetchData = this.fetchData.bind(this);
    this.timer = this.timer.bind(this)
    this.setMills = this.setMills.bind(this);
    this.setLathes = this.setLathes.bind(this);
  }


  componentDidMount() {
    var intervalId = setInterval(this.timer, 300000);
    this.setState({intervalId: intervalId, currentCount: 5});
    this.fetchData()
  }

  componentWillUnmount() {
     // use intervalId from the state to clear the interval
     clearInterval(this.state.intervalId);
  }

  timer() {
    var newCount = this.state.currentCount - 1;
    if(newCount >= 0) {
        this.setState({ currentCount: newCount });
    } else {
        this.setState({currentCount: 300 });
        this.fetchData();
        //clearInterval(this.state.intervalId);
    }
  }

  fetchData = () => {
    return (axios.get('http://api.bcfmanufacturing.com/manufacturing/shop', {headers: {authorization: 'cschmidtbcf'}})
    //axios.get('http://localhost:5001/manufacturing/shop', {headers: {authorization: 'cschmidtbcf'}})
      .then((response) => {
        let res = JSON.parse(response.data)
        if (res["LATHES"] !== undefined && res["MILLS"] !== undefined) {
          this.setState({ lathes: res.LATHES, mills: res.MILLS })
        }
        else if (res["LATHES"] !== undefined && res["MILLS"] === undefined) {
          this.setState({ lathes: res.LATHES, mills: [] })
        }
        else if (res["LATHES"] === undefined && res["MILLS"] !== undefined) {
          this.setState({ lathes: [], mills: res.MILLS })
        }
        else {
          this.setState({ lathes: [], mills: [] })
        }
      })
      .catch(function (error) {
        console.log(error);
      }))
  }

  setLathes = (e) => {
    e.preventDefault();
    return this.setState({ viewState: 'LATHES' })
  }

  setMills = (e) => {
    e.preventDefault();
    return this.setState({ viewState: 'MILLS' })
  }

  render() {
    var headerStyle = {
      textAlign: 'center',
    }

    return (
      <div className="Shop">
        <h1 style={headerStyle}>Bio Chem Shop Schedule</h1>
        <div className="row">
        <a class="waves-effect waves-light btn col s5" onClick={this.setMills}>MILLS</a>
        <div className="col s2">
        </div>
        <a class="waves-effect waves-light btn col s5" onClick={this.setLathes}>LATHES</a>
        </div>
        { this.state.viewState === 'MILLS' ?
          <div>
            <h2 style={headerStyle}>Mills</h2>
            <Mills mills={this.state.mills} />
          </div>
          :
          <div>
            <h2 style={headerStyle}>Lathes</h2>
            <Lathes lathes={this.state.lathes} />
          </div>
        }
      </div>
    );
  }
}

export default Shop;
