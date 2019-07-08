import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { createStyles, Theme, Typography, withStyles } from "@material-ui/core";
import "./App.css";
import Header from './Header';
import { User } from "firebase";

export const styles = ({ spacing }: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: spacing(1),
    paddingTop: spacing(10),
  },
  caption: {
    textAlign: "center",
    width: "100%",
  },
});

export interface Props {
  user: User | null;
  classes: {
    root: string;
    caption: string;
  };
}

class Home extends Component<Props> {
  render() {
    const { classes, user } = this.props;
    return (
      <>
        <Header user={user} />
        <Grid container justify="center" alignItems="center" direction="row" className={classes.root}>
          <Grid className={classes.caption}>
            <Typography component="h2" variant="h5" gutterBottom>
              Welcome to Firebase Starter Kit!
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Home);