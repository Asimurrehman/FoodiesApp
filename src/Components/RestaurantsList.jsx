import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { ListGroup } from 'react-bootstrap'
import { ListGroupItem } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';

// import {Button} from 'react-bootstrap'
import Button from '@material-ui/core/Button';





import firebase from '../Config/fire'



class RestaurantsList extends Component {

  constructor() {
    super()
    this.state = {
      ResList: [],
      text: '',
      searchData: [],
    }
  }

  componentDidMount() {
    let uid = localStorage.getItem('uid')
    firebase.database().ref("users").on("child_added", (data) => {
      // console.log(data.val())
      if (data.val().info.type === "restaurant") {
        // console.log(data.val().info)
        let ResList = this.state.ResList
        let arr = []
        arr.push(data.val().info)
        ResList.push(arr)
        this.setState({ ResList, uid })


      }

    })
  }
  SearchData(as) {
    let searchData = this.state.ResList.filter((e) => {
      return e[0].RestaurantName.includes(as.target.value)

    })
    this.setState({ searchData })
    console.log(this.state.searchData)
  }

  detail(value) {
    localStorage.setItem('resuid', value)
    this.props.history.push('./DetailScreen')
  }
  render() {
    const { ResList, searchresult } = this.state;
    console.log(this.props)

    // console.log('list ++++++++++.', searchresult)
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
            List Of Restaurant's
                        </Typography>
        </div>
        <br />
        <div>
          <TextField
            id="outlined-search"
            label="Search Restaurants Name"
            type="search"
            onChange={this.SearchData.bind(this)}
            margin="normal"
            variant="outlined"
          />

        </div>
        <hr />
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {this.state.searchData.length ? this.state.searchData.map((elem) => {
            return <Card style={{ width: '18rem', border: '2px solid #D70F64', padding: '10px', margin: '10px' }}>
              <Card.Img variant="top" src={elem[0].photoURL} style={{ width: '100%', borderRadius: '5px' }} />
              <Card.Body>
                <Card.Title style={{ color: '#D70F64', fontSize: '25px' }}>{elem[0].RestaurantName}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                              </Card.Text>
                <Button variant="outlined" color="secondary" size="large" >
                  Detail
                                </Button>
              </Card.Body>
            </Card>
          }) : this.state.ResList.map((elem) => {
            return <Card style={{ width: '18rem', border: '2px solid #D70F64', padding: '10px', margin: '10px' }}>
              <Card.Img variant="top" src={elem[0].photoURL} style={{ width: '100%', borderRadius: '5px' }} />
              <Card.Body>
                <Card.Title style={{ color: '#D70F64', fontSize: '25px' }}>{elem[0].RestaurantName}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                              </Card.Text>
                <Button variant="outlined" color="secondary" size="large" onClick={this.detail.bind(this, elem[0].uid)}>
                  Detail
                            </Button>
              </Card.Body>
            </Card>
          })}
        </div>
      </div>
    )
  }
}


export default RestaurantsList
