import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import firebase from '../Config/fire'
import {withRouter} from 'react-router-dom';


export class FoodItems extends Component {
    constructor() {
        super()
        this.state = {

        }
        this.check = []
    }

    Done() {
        this.check.map((elem) => console.log(elem))
        let Uid = firebase.auth().currentUser.uid
        console.log(Uid)
        firebase.database().ref('users/' + Uid + '/items').set(this.check.map((elem) => { return elem }))
            .then(() => {
this.props.history.push('./Pending')
            })

    }
    render() {
        return (
            <div>
                <div  >
                    <Typography variant='h3' color='secondary' style={{ textDecoration: 'Underline', textShadow: '2px 2px 2px  #D70F64' }}>
                        Select The FooD Items
                        </Typography>
                    <Button variant="outlined" color="secondary" size="large" style={{ float: 'right' }} >
                        LogOut
           </Button>
                </div>
                <br />
                <br />
                <hr />
                <div style={{ marginTop: '100px', marginBottom: '100px' }} >
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }}><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Karahi" />Chicken Tikka</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }}><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="broast" />Broast</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }}><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="zinger" />Zinger</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }}><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="showarma" />Showarma</label>
                    <br />
                    <br />
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }} ><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Beef Burger" />Beef Burger</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }}><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Daal Mash" />Daal Mash</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }} ><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Paneer Reshmi" />Paneer Reshmi</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }}><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Palak Paneer" />Palak Paneer</label>
                    <br />
                    <br />
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }}><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Seekh kabab" />Seekh kabab</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }} ><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Gola Kabab" />Gola Kabab</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }}><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Dum Pukht" />Dum Pukht</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }}><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Chapli Kabab" />Chapli Kabab</label>
                    <br />
                    <br />
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }} ><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Chicken Malai Boti" />Chicken Malai Boti</label>

                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }} ><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Beef Karahi" />Beef Karahi</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }} ><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Mutton karahi" />Mutton karahi</label>
                    <label className="checkbox-inline" style={{ fontSize: '20px', color: '#D70F64' }} ><input type="checkbox"
                        onChange={(e) => this.check = [...this.check, e.target.value]} value="Nehari" />Nehari</label>

                </div>
                <hr />
                <br />
                <div>
                    <Button variant="outlined" color="secondary" size="large" onClick={this.Done.bind(this)}>
                        Selection Done
           </Button>
                </div>
            </div>
        )
    }
}

export default withRouter(FoodItems) 
