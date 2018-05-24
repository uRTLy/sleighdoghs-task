import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { AppBar, Button, Toolbar, withStyles } from '@material-ui/core';

import { Search, GoogleLoginPanel } from '../components';
import { actions } from '../store';

const styles = theme => ({
  justify: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  root: {
    flexGrow: 1,
  },
  panel: {
    width: 250,
    textAlign: 'right',
  },
  centerFlex: {
    alignSelf: 'center',
  },
  paperBtn: {
    backgroundColor: theme.palette.background.paper,
  },
});

class Navbar extends Component {
  componentDidMount() {
    this.props.actions.authorizeOnStartup();
  }
  onSearch = form => {
    this.props.actions.search(form.query);
  };
  render() {
    const { classes, actions, store } = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar className={classes.justify}>
            <Button component={Link} to="/" className={classes.paperBtn}>
              HOME
            </Button>
            <div className={classes.centerFlex}>
              <Search onSubmit={this.onSearch} />
            </div>
            <div className={classes.panel}>
              {store.auth.isAuthenticated ? (
                <div>
                  <GoogleLoginPanel user={store.auth.user}>
                    <Button onClick={actions.logout}> Logout </Button>
                  </GoogleLoginPanel>
                </div>
              ) : (
                <Button onClick={actions.login} to="/login">
                  Login
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    search: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func,
    authorizeOnStartup: PropTypes.func,
  }).isRequired,
  store: PropTypes.shape({
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool,
      user: PropTypes.object,
    }),
  }).isRequired,
};

const StyledNavbar = withStyles(styles)(Navbar);

const mapStateToProps = store => ({ store });
const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(actions, dispatch),
    goToVideoView: () => dispatch(push('/video')),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledNavbar);
