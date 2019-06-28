import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Coverpic from '../Images/cover.jpg'
import Button from '@material-ui/core/Button';
import Zinger from '../Images/zinger.png'
import Shawarma from '../Images/shawarma.jpg'
import Broast from '../Images/broast.jpg'

import firebase from '../Config/fire'
import { ListGroup, ListGroupItem, Card } from 'react-bootstrap'
import Tikka from '../Images/tikka.jpg'


export class DetailScreen extends Component {
  constructor() {
    super()
    this.state = {

      ItemsData: [],
    }
  }
  componentDidMount() {
    let uid = localStorage.getItem('resuid')
    this.setState({ uid })
    firebase.database().ref("users/" + uid).on('value', (data) => {
      let allitems = data.val().items
      allitems.shift()
      let arr = []
      arr.push(allitems)
      this.setState({ ItemsData: arr })



    })
  }

  order(e, p) {
    let ResUid = localStorage.getItem('resuid')
    console.log(ResUid)
    let myId = firebase.auth().currentUser.uid
    console.log(myId)
    let pushRestaurant = firebase.database().ref("users/" + ResUid + "/allRequests").push().key
    let pushUser = firebase.database().ref("users/" + myId + "/myRequests").push().key
    let userObj = {
      item: e,
      price: p + "$",
      uid: myId,
      status: "pending",
      pushRestaurant,
      pushUser,
    }
    firebase.database().ref("users/" + ResUid + "/allRequests/" + pushRestaurant).set(userObj)

    let userObj1 = {
      item: e,
      price: p + "$",
      uid: ResUid,
      status: "pending",
      pushRestaurant,
      pushUser,
    }
    firebase.database().ref("users/" + myId + "/myRequests/" + pushUser).set(userObj1)
      .then(() => {
        this.props.history.push('./MyRequests')
      })


  }
  render() {
    const { AllData, ItemsData } = this.state;
    console.log('data', AllData)
    console.log('data', ItemsData)



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
        <div style={{ marginTop: '10px' }}>
          <img src={Coverpic} alt="" width='100%' />
        </div>
        <br />
        <hr />
        <div>
          <Typography variant='h3' color='secondary' style={{ textDecoration: 'Underline', textShadow: '2px 2px 2px  #D70F64' }}>
            Food Items
                        </Typography>
        </div>
        <br />
        <hr />
        <div>
          {
            ItemsData.length !== 0 && ItemsData.map((elem) => {
              const price = Math.floor(Math.random(1) * 1000)
              return <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Card style={{ width: '18rem', border: '2px solid #D70F64', padding: '10px', margin: '10px' }}>
                  <Card.Img variant="top" src={Zinger} style={{ width: '100%', borderRadius: '5px' }} />
                  <Card.Body>
                    <Card.Title style={{ color: '#D70F64', fontSize: '25px' }}>{elem[0]}</Card.Title>
                    <Card.Text>
                      Order Some Delicious Food From FooDies.com
                              </Card.Text>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>Price : {price}$</ListGroupItem>

                    </ListGroup>
                    <hr />
                    <br />

                    <Button variant="outlined" color="secondary" size="large" onClick={this.order.bind(this, elem[0], price)} >
                      Order Now
                                </Button>
                  </Card.Body>
                </Card>
              </div>
            })
          }
        </div>
      </div>
    )
  }
}

export default DetailScreen
