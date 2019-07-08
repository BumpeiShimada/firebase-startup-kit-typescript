import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import * as firebase from "firebase/app";
import "firebase/auth";
import { User } from "firebase";

interface Props {
  user: User | null;
  classes: {
    root: string;
    grow: string;
    menuButton: string;
  };
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MyAppBar extends Component<Props> {
  state = {
    drawer: false,
  };

  handleMenu = () => {
    this.setState({ drawer:true });
  };

  handleClose = () => {
    this.setState({ drawer:false });
  };

  logout = () => {
    console.log("logout");
    firebase.auth().signOut();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} onClick={this.handleMenu} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Firebase Rocks!
              </Typography>
              {this.props.user
                ? <Button color="inherit" onClick={this.logout}>Logout</Button>
                : <Button color="inherit" to={"/login"} component={Link}>Login</Button>
              }
            </Toolbar>
          </AppBar>
          <Drawer open={this.state.drawer} onClose={this.handleClose}>
            <List>
              <ListItem button to="/" component={Link}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <Divider />
              <ListItem button to="/about" component={Link}>
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </List>
          </Drawer>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(MyAppBar);