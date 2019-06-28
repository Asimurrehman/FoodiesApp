import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import firebase from '../Config/fire'
import Swal from 'sweetalert2';
import './Loader.css'





class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      type: "user",
      show: false,

      userName: '',
      email: '',
      Gender: '',
      Age: '',
      Country: '',
      City: '',
      Password: '',
      Cpassword: '',

    }
  }

  signup() {
    const { userName, email, Gender, Age, Country, City, password, Cpassword, type } = this.state
    if (userName !== '' && email !== '' && Gender !== '' && Age !== '' && Country !== '' && City !== '' &&
      password !== '' && Cpassword !== '') {
      if (Gender === "male" || Gender === "Male" || Gender === "female" || Gender === "Female") {
        if (password === Cpassword) {
          this.setState({ show: true })
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((succ) => {
              var user = firebase.auth().currentUser
              let UserObj = { userName, email, Gender, Age, Country, City, password, Cpassword, type }
              user.sendEmailVerification()
                .then((success) => {
                  firebase.database().ref("users/" + succ.user.uid + "/info").set(UserObj)
                  Swal.fire({

                    title: "Welcome",
                    text: "Your Data Has Been Saved",
                    icon: "success",
                    button: "Done",
                  })
                    .then((succc) => {
                      setTimeout(() => {
                        console.log("welcome")
                        this.setState({ show: false })
                      }, 5000);


                    })
                    .then((e) => {
                      console.log('props', this.props)
                      this.props.history.push('./Login')
                    })
                    .catch((error) => {
                      console.log(error)
                    })

                })

            })
            .catch((error) => {
              var errorMessage = error.message;
              // this.setState({ show: false })
              Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
                button: "OK",
              })

            })
        }
        else {
          Swal.fire({
            title: "Error",
            text: "Passwords Are not Matched",
            icon: "error",
            button: "OK",
          })
        }
      }
      else {
        Swal.fire({
          title: "Error",
          text: "Gender Should Be Male or Female",
          icon: "error",
          button: "OK",
        })
      }

    }
    else {
      Swal.fire({
        title: "Error",
        text: "Input fields can't be empty",
        icon: "error",
        button: "OK",
      })
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
            User Registration
                        </Typography>
        </div>
        <div style={{ marginTop: '65px' }}>
          <TextField
            id="outlined-name"
            label="Name"

            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ userName: e.target.value })}
          />

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
            id="outlined-gender"
            label="Gender"

            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ Gender: e.target.value })}

          />

          <TextField
            id="outlined-number"
            label="Age"
            type="number"
            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ Age: e.target.value })}

          />
          <br />
          <TextField
            id="outlined-country"
            label="Country"

            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ Country: e.target.value })}

          />

          <TextField
            id="outlined-city"
            label="City"

            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ City: e.target.value })}

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

          <TextField
            id="outlined-Cpassword-input"
            label="Confirm Password"
            // className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ Cpassword: e.target.value })}

          />
        </div>
        <div style={{ marginTop: "10px", textAlign: 'center' }}>
          {this.state.show && <div className="lds-facebook"><div></div><div></div><div></div></div>}
        </div>
        <br />
        <div>
          <Button variant="outlined" color="secondary" size="large" onClick={this.signup.bind(this)}  >
            Registered Now
           </Button>
        </div>
      </div>
    )
  }
}

export default Signup;