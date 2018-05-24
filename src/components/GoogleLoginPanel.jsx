import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Typography, Paper, withStyles } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    padding: 5,
  },
  avatar: {
    width: 35,
    height: 35,
    margin: 7,
  },
  email: {
    fontSize: 7,
  },
};

class GoogleLoginPanel extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      lastName: PropTypes.string,
      fullName: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
    }),
  };
  render() {
    const { classes, user } = this.props;
    return (
      <Paper className={classes.container}>
        <Avatar src={user.avatar} className={classes.avatar} />
        <Typography>{user.fullName}</Typography>
        {this.props.children}
      </Paper>
    );
  }
}
export default withStyles(styles)(GoogleLoginPanel);
