import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import firebase from '../Config/fire'
import Typography from '@material-ui/core/Typography';
import Table from 'react-bootstrap/Table'



export class Progress extends Component {
  constructor() {
    super()
    this.state = {
      fullData: [],
      filtered: []
    }
  }
  componentDidMount() {
    this.get()
  }

  get() {
    let uid = localStorage.getItem("uid")
    firebase.database().ref("users/" + uid + "/allRequests").on("child_added", (data) => {
      let fullData = this.state.fullData
      let arr = []
      arr.push(data.val())
      fullData.push(arr)
      this.setState({ fullData })
      setTimeout(() => {
        let filtered = this.state.fullData.filter((e) => {
          return e[0].status === "approved"
        })
        this.setState({ filtered })
      }, 2000)
    })
  }

  approve(e, rest, user) {
    let userUid = e
    let myUid = firebase.auth().currentUser.uid
    firebase.database().ref("users/" + myUid + "/allRequests/" + rest).update({ status: "delivered" })
    firebase.database().ref("users/" + userUid + "/myRequests/" + user).update({ status: "delivered" })
      .then(() => {
        this.props.history.push('./Delivered')
      })
  }
  render() {
    const { filtered, fullData } = this.state;
    console.log(fullData)
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
            Progress Status
                        </Typography>
        </div>
<br/>
<br/>
        <div>
          <Table className="table table-striped std" style={{ marginTop: "20px", margin: "0px auto" }}>
            <hr />
            <thead>

              <tr>
                <td style={{ fontSize: '20px', padding: '10px' }}>Item Name</td>
                <td style={{ fontSize: '20px', padding: '10px' }}>Price</td>
                <td style={{ fontSize: '20px', padding: '10px' }}>Action</td>

              </tr>

            </thead>

            <tbody>

              {this.state.filtered.length ? this.state.filtered.map((e) => {
                return <tr key={Math.random(36)}>
                  <td style={{ color: ' #D70F64', fontSize: '20px' }}>{e[0].item}</td>
                  <td style={{ color: ' #D70F64', fontSize: '20px' }}>{e[0].price}</td>
                  <td >  <Button variant="outlined" color="secondary" size="large" onClick={this.approve.bind(this, e[0].uid, e[0].pushRestaurant, e[0].pushUser)} >
                    Approved
                            </Button>
                  </td>


                </tr>

              }) : <tr><td>No Progress Items</td></tr>}

            </tbody>
            <hr />
          </Table>
        </div>
      </div>
    )
  }
}

export default Progress
