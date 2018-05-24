import React, { Component } from 'react';

import { Navbar } from '../containers';

import { Grid, CssBaseline, withStyles } from '@material-ui/core';

const sizes = {
  appBarHeight: 64,
  spacing: 16,
};
const styles = {
  pushContainer: {
    marginTop: sizes.appBarHeight + sizes.spacing,
  },
};

class MainLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar />
        <Grid container className={this.props.classes.pushContainer} justify="center">
          <Grid item xs={12}>
            {this.props.children}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MainLayout);
