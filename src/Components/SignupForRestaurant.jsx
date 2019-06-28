import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import firebase from '../Config/fire'
import './Loader.css'
import Swal from 'sweetalert2';








class SignupForRestaurant extends React.Component {


  constructor() {
    super()
    this.state = {
      type: "restaurant",
      show: false,

      RestaurantName: '',
      OwnerName: '',
      email: '',
      Country: '',
      City: '',
      password: '',
      Cpassword: '',
      Certificate: '',
      img: ''
    }
  }

  signup() {
    const { RestaurantName, OwnerName, email, Country, City, password, Cpassword, Certificate, type, img } = this.state
    if (RestaurantName !== '' && OwnerName !== '' && email !== '' && Country !== '' && City !== '' && password !== '' &&
      Cpassword !== '' && Certificate !== '' && img !== '') {
      if (password === Cpassword) {
        this.setState({ show: true })
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((succ) => {
            var user = firebase.auth().currentUser;
            let uid = succ.user.uid
            let userObj = {
              RestaurantName,
              OwnerName,
              email,
              Country,
              City,
              password,
              Cpassword,
              Certificate,
              uid,
              type
            }
            user.sendEmailVerification()
              .then((success) => {
                let storageRef = firebase.storage().ref().child(`restaurantImages/${img.name}`)
                storageRef.put(img)
                  .then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((snapUrl) => {
                      userObj.photoURL = snapUrl
                      firebase.database().ref("users/" + succ.user.uid + "/info").set(userObj)
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
                        .catch((errors) => {
                          console.log(errors)
                        })
                    })
                  })
              })
          })
          .catch((err) => {
            var errorMessage = err.message;

            Swal.fire({
              title: "Error",
              text: errorMessage,
              icon: "error",
              button: "OK",
            })
          });
      } else {
        Swal.fire({
          title: "Error",
          text: "Passwords Are not Matched",
          icon: "error",
          button: "OK",
        })
      }
    } else {
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
              <Button color="inherit">Back</Button>
            </Toolbar>
          </AppBar>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Typography variant='h3' color='secondary' style={{ textDecoration: 'Underline', textShadow: '2px 2px 2px  #D70F64' }} >
            Restaurants Registration
                        </Typography>
        </div>
        <div style={{ marginTop: '65px' }} >
          <TextField
            id="outlined-name"
            label="Restaurant Name"
            required="required"
            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ RestaurantName: e.target.value })}
          />
          <TextField
            id="outlined-name"
            label="Owner Name"

            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ OwnerName: e.target.value })}

          />
          <br />
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



          <TextField
            id="outlined-country"
            label="Country"

            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ Country: e.target.value })}

          />
          <br />
          <TextField
            id="outlined-city"
            label="City"

            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ City: e.target.value })}

          />

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
          <br />
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
          <TextField
            id="outlined-certificate"
            label="Certificate"

            margin="normal"
            variant="outlined"
            onChange={(e) => this.setState({ Certificate: e.target.value })}

          />




        </div>
        <input type="file" onChange={(e) => this.setState({ img: e.target.files[0] })} />


        <div style={{ marginTop: "10px" }}>
          {this.state.show && <div className="lds-facebook"><div></div><div></div><div></div></div>}
        </div>
        <br />
        <div>
          <Button variant="outlined" color="secondary" size="large" onClick={this.signup.bind(this)} >
            Registered Now
           </Button>
        </div>


      </div>
    )
  }
}

export default SignupForRestaurant;