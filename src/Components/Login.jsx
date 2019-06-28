import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import firebase from '../Config/fire'
import './Loader.css'
import Swal from 'sweetalert2';



class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false,

      email: '',
      password: '',
    }
  }
  login() {
    const { email, password } = this.state
    if (email !== '' && password !== '') {
      this.setState({ show: true })
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((success) => {
          this.setState({ show: false })
          localStorage.setItem("uid", success.user.uid)

          Swal.fire({

            title: "Welcome",
            text: "You Login Successfully",
            icon: "success",
            button: "Done",
            ButtonColor: ' #D70F64',
          })
            .then((e) => {
              setTimeout(() => {
                console.log("welcome")
                this.setState({ show: "none" })
              }, 2000);

            })
            .then(() => {
              firebase.database().ref("users/" + success.user.uid + "/info").on("value", (data) => {

                let type = data.val().type
                if (type === "user") {
                  console.log("User Come", this.props)
                  this.props.history.push('./UserDashboard')
                } else {
                  console.log("Restaurant her", this.props)
                  this.props.history.push('./RestaurantDashboard')
                }
              })
            })



        })
        .catch((error) => {
          var errorMessage = error.message;
          this.setState({ show: false })
          Swal.fire({
            title: "Error Catched",
            text: errorMessage,
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Error Catched",
        text: "Input fields can't be empty",
        icon: "error",
      });
    }
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
            Login Form
                        </Typography>
        </div>
        <div style={{ marginTop: '10%' }}>


          <TextField
            id="outlined-email-input"
            label="Email"
            // className={classes.textField}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            // className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ password: e.target.value })}
          />


        </div>
        <div style={{ marginTop: "10px" }}>
          {this.state.show && <div className="lds-facebook"><div></div><div></div><div></div></div>}
        </div>
        <br />
        <div>
          <Button variant="outlined" color="secondary" size="large" onClick={this.login.bind(this)} >
            Login Now
           </Button>
        </div>
      </div>
    )
  }
}

export default Login;