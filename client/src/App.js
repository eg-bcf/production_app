import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      intervalId: 0,
      currentCount: 5
    };

    this.fetchData = this.fetchData.bind(this);
    this.timer = this.timer.bind(this)
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
    return (axios.get('http://localhost:5000/manufacturing', {headers: {authorization: 'cschmidtbcf'}})
      .then((response) => {
        let res = JSON.parse(response.data)
        var newRes = res.filter( rows => rows.MILL !== null)
        this.setState({ rows: newRes })
      })
      .catch(function (error) {
        console.log(error);
      }))
  }

  render() {
    var tableStyle = {
      backgroundColor: '#f08080'
    }

    return (
      <div className="App">
        Production App
        <table>
        <thead>
          <tr>
              <th>MILL</th>
              <th>SEQUENCE</th>
              <th>CALENDAR</th>
              <th>PART NUMBER</th>
              <th>QTY</th>
              <th>START JOB</th>
              <th>FINISH JOB</th>
              <th>NEED DATE</th>
              <th>DAYS LATE</th>
              <th>LATE?</th>
              <th>WORK ORDER #</th>
              <th>COMMENTS</th>
              <th>MATERIAL</th>
          </tr>
        </thead>
        <tbody>
        { this.state.rows.length > 1 ?
          this.state.rows.map( rows => {
            return ( rows["LATE?"] === 'LATE' ?
                <tr style={tableStyle}>
                  <td colSpan="1">{rows.MILL}</td>
                  <td colSpan="1">{rows['SEQ #']}</td>
                  <td colSpan="1">{rows.CALENDAR}</td>
                  <td colSpan="1">{rows["PART NUMBER"]}</td>
                  <td colSpan="1">{rows.QTY}</td>
                  <td colSpan="1">{rows["START JOB"]}</td>
                  <td colSpan="1">{rows["FINISH JOB"]}</td>
                  <td colSpan="1">{rows["\"NEED DATE \""]}</td>
                  <td colSpan="1">{rows["DAYS LATE"]}</td>
                  <td colSpan="1">{rows["LATE?"]}</td>
                  <td colSpan="1">{rows["Work Order #"]}</td>
                  <td colSpan="1">{rows["COMMENTS"]}</td>
                  <td colSpan="1">{rows["MATERIAL"]}</td>
                </tr>
                :
                <tr>
                  <td colSpan="1">{rows.MILL}</td>
                  <td colSpan="1">{rows['SEQ #']}</td>
                  <td colSpan="1">{rows.CALENDAR}</td>
                  <td colSpan="1">{rows["PART NUMBER"]}</td>
                  <td colSpan="1">{rows.QTY}</td>
                  <td colSpan="1">{rows["START JOB"]}</td>
                  <td colSpan="1">{rows["FINISH JOB"]}</td>
                  <td colSpan="1">{rows["\"NEED DATE \""]}</td>
                  <td colSpan="1">{rows["DAYS LATE"]}</td>
                  <td colSpan="1">{rows["LATE?"]}</td>
                  <td colSpan="1">{rows["Work Order #"]}</td>
                  <td colSpan="1">{rows["COMMENTS"]}</td>
                  <td colSpan="1">{rows["MATERIAL"]}</td>
                </tr>
              )
          })
          :
          <tr>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
            <td>Nothing</td>
          </tr>
        }
        </tbody>
        </table>
      </div>
    );
  }
}

export default App;
