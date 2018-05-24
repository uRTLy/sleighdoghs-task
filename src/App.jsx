import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './store';

import { api, loadGapiScript } from './utils';

import { HomeScreen, MainLayout, VideoScreen } from './containers';

import { LinearProgress, CssBaseline } from '@material-ui/core';

class App extends Component {
  state = {
    message: `Couldn't load the application. Please refresh the page.`,
    error: '',
    ready: false,
  };
  async componentDidMount() {
    try {
      await loadGapiScript();
      await api.initClient();
      this.setState({ ready: true });
    } catch (e) {
      this.setState({ error: e, ready: true });
    }
  }
  render() {
    if (!this.state.ready) {
      return <LinearProgress />;
    }
    if (this.state.error) {
      return <div>{this.state.message + '-' + this.state.error}</div>;
    }
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MainLayout>
            <Switch>
              <Route path="/video" component={VideoScreen} />
              <Route path="/" component={HomeScreen} />
            </Switch>
          </MainLayout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
