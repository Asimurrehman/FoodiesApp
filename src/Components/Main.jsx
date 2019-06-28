import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



export default class SimpleAppBar extends React.Component {
  state = {

  }
  SignupForRestaurant() {
    console.log(this.props)
    this.props.history.push('./SignupForRestaurant')
  }

  Signup() {
    console.log(this.props)
    this.props.history.push('./Signup')
  }
  Login() {
    console.log(this.props)
    this.props.history.push('./Login')
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
        {<br />}
        <Typography variant='h3' color='secondary' style={{ textDecoration: 'Underline', textShadow: '2px 2px 2px  #D70F64' }}>
          Welcome To FooDies.Com
        </Typography>
        {<br />}
        <div style={{ marginTop: '65px' }}>
          <Button variant="outlined" color="secondary" size="large" onClick={this.SignupForRestaurant.bind(this)} >
            Restaurants Registration
             </Button>
          <br /><br /><br />
          <Button variant="outlined" color="secondary" size="large" onClick={this.Signup.bind(this)}>
            User Registration
          </Button>
          <br /><br /><br />
          <Button variant="outlined" color="secondary" size="large" onClick={this.Login.bind(this)}>
            Login Now
           </Button>
          <br /><br />
          <Typography variant="h6" color='error' style={{ marginTop: '50px' }}>
            Note: If you Already Have An Account So Login Now ...
           </Typography>
        </div>


      </div>
    );
  }




}