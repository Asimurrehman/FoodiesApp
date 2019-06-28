import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';





const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class ResponsiveDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileOpen: false,
      toggle: '',
      toggle1: false,
      ResList: [],

    };
    // this.renderfunc=this.renderfunc.bind(this);
  }


  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  // renderfunc(txt){
  //     console.log("=====>",Object.values(txt))
  //     this.setState({toggle:Object.values(txt)})

  // }



  render() {

    const { classes, theme } = this.props;
    console.log(this.props)
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Restaurants', 'My Requests'].map((text, index) => (
            <ListItem key={text} button onClick={() => {
              if (text === 'Restaurants') {
                this.props.history.push('./Restaurants')
              }
              else {
                this.props.history.push('./MyRequests')
              }
            }}  >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />

      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" style={{ backgroundColor: ' #D70F64' }} className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" noWrap>
              User Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <div style={{ marginTop: '20px' }}>
            <Typography variant='h3' color='secondary' style={{ textDecoration: 'Underline', textShadow: '2px 2px 2px  #D70F64' }}>
              GoogleMap
                        </Typography>
          </div>
          <br />


          <div style={{ border: '2px solid  #D70F64', padding: '10px' }}>
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <br />




          <div>
            <Button variant="outlined" color="secondary" size="large" onClick={() => { this.props.history.push('./RestaurantsList') }} >
              Done
           </Button>
          </div>

          <hr />




        </main>

      </div>
    );
  }
}


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 24.9367697, lng: 67.0291706 }}
  >
    {props.isMarkerShown && <Marker
      draggable={true}
      position={{ lat: 24.9367697, lng: 67.0291706 }}


    />


    }
    <Marker
      draggable={true}
      position={{ lat: 24.9406105, lng: 67.0303992 }} />
  </GoogleMap>
))

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
