import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import firebase from '../Config/fire'
import Table from 'react-bootstrap/Table'
import './Loader.css'


export class MyRequests extends Component {
  constructor() {
    super()
    this.state = {
      fullData: [],
      filtered: [],
      show: "none"

    }
  }

  componentDidMount() {
    let uid = localStorage.getItem("uid")
    firebase.database().ref("users/" + uid + "/myRequests").on("child_added", (data) => {
      let fullData = this.state.fullData
      let arr = []
      arr.push(data.val())
      fullData.push(arr)
      this.setState({ fullData })
      console.log(fullData)
    })
  }
  pending() {
    this.setState({ show: "inline" })
    console.log("pending")
    setTimeout(() => {
      let filtered = this.state.fullData.filter((e) => {
        return e[0].status === "pending"
      })
      console.log(filtered)
      this.setState({ filtered, show: "none" })
    }, 2000);

  }
  progress() {
    console.log("approve")
    this.setState({ show: "inline", filtered: [] })
    setTimeout(() => {
      let filtered = this.state.fullData.filter((e) => {
        return e[0].status === "approved"
      })
      console.log(filtered)
      this.setState({ filtered, show: "none" })
    }, 2000);
  }
  delivered() {
    console.log("delivered")
    this.setState({ show: "inline", filtered: [] })
    setTimeout(() => {
      let filtered = this.state.fullData.filter((e) => {
        return e[0].status === "delivered"
      })
      console.log(filtered)
      this.setState({ filtered, show: "none" })
    }, 2000);
  }

  back() {
    this.props.history.push('./UserDashboard')
  }
  render() {
    return (
      <div>
        <div>
          <AppBar position="static" color="default" style={{ backgroundColor: ' #D70F64', color: 'white' }}>
            <Toolbar>
              <Typography variant="h4" color="inherit" style={{ textDecoration: 'Underline', textShadow: '2px 2px 20px  white' }}>
                FooDies
            </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Typography variant='h3' color='secondary' style={{ textDecoration: 'Underline', textShadow: '2px 2px 2px  #D70F64' }}>
            My Requests
                        </Typography>
        </div>
        <br />
        <hr />
        <div>
          <Button variant="outlined" color="secondary" size="large" onClick={this.pending.bind(this)}  >
            Pending
           </Button>
          <Button variant="outlined" color="secondary" size="large" onClick={this.progress.bind(this)}  >
            In Progress
           </Button>
          <Button variant="outlined" color="secondary" size="large" onClick={this.delivered.bind(this)} >
            Delivered
           </Button>
          <Button variant="outlined" color="secondary" size="large" onClick={this.back.bind(this)} >
            Back to Dashboard
           </Button>
        </div>
        <br />
        <div>
          <table className="table table-striped std" style={{ marginTop: "20px", margin: "0px auto" }}>
            <hr />
            <thead>

              <tr>
                <td style={{ fontSize: '20px', padding: '10px' }}>Item Name</td>
                <td style={{ fontSize: '20px', padding: '10px' }}>Price</td>
              </tr>

            </thead>

            <tbody>

              {this.state.filtered.length ? this.state.filtered.map((e) => {
                return <tr key={Math.random(36)}>
                  <td style={{ color: ' #D70F64', fontSize: '20px' }}>{e[0].item}</td>
                  <td style={{ color: ' #D70F64', fontSize: '20px' }}>{e[0].price}</td>
                </tr>

              }) : <h3 style={{ color: ' red', fontSize: '20px' }}>No posts here</h3>}

            </tbody>
            <hr />
          </table>
        </div>
        <div>
          <div style={{ width: "50%", textAlign: "center", marginLeft: "50%" }}>
            <div className="lds-facebook" style={{ display: this.state.show }}><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyRequests
