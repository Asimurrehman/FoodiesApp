import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignupForRestaurant from '../Components/SignupForRestaurant.jsx';
import Signup from '../Components/Signup.jsx';
import Login from '../Components/Login.jsx';
import Main from '../Components/Main.jsx';
import RestaurantDashboard from '../Components/RestaurantDashboard.jsx'
import UserDashboard from '../Components/UserDashboard.jsx'
import Restaurants from '../Components/Restaurants.jsx'
import MyRequests from '../Components/MyRequests.jsx'
import Pending from '../Components/Pending.jsx'
import Progress from '../Components/Progress.jsx'
import Delivered from '../Components/Delivered.jsx'
import RestaurantsList from '../Components/RestaurantsList.jsx';
import DetailScreen from '../Components/DetailScreen.jsx'

function Navigations() {
    return (
      <Router>
        <div>
          {/* <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
  
          <hr /> */}
  
          <Route exact path="/" component={Main} />
          <Route path="/SignupForRestaurant" component={SignupForRestaurant} />
          <Route exact path="/Signup" component={Signup} />
          <Route path="/Login" component={Login}/>
          <Route path="/RestaurantDashboard" component={RestaurantDashboard}/>
          <Route path="/UserDashboard" component={UserDashboard}/>
          <Route  path="/Restaurants" component={Restaurants}/>
          <Route path="/MyRequests" component={MyRequests}/>
          <Route path="/Pending" component={Pending}/>
          <Route path="/Progress" component={Progress}/>
          <Route path="/Delivered" component={Delivered}/>
          <Route path="/RestaurantsList" component={RestaurantsList}/>
          <Route path="/DetailScreen" component={DetailScreen}/>


</div>
      </Router>
    );
  }
  
  export default Navigations;