import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Grid, CircularProgress, withStyles } from '@material-ui/core';
import { VideoTile } from '../components';

import { actions } from '../store';

const styles = {
  container: {
    position: 'relative',
  },
  progressLoader: {
    position: 'absolute',
    marginLeft: '50%',
    width: 40,
    left: -20,
  },
};

class HomeScreen extends Component {
  componentDidMount() {
    if (!this.props.query) {
      this.props.getTrendingVideos();
    }
  }
  onSelectVideo = video => {
    this.props.selectVideo(video);
    this.props.goToVideoScreen();
  };
  render() {
    const { videos, loading, classes } = this.props;

    return (
      <Grid container spacing={16} className={(loading && classes.container) || ''}>
        {loading && <CircularProgress className={classes.progressLoader} />}

        {videos.map(video => (
          <Grid item xs={12} sm={4} xl={3} key={typeof video.id === 'object' ? video.id.videoId : video.id}>
            <VideoTile video={video.snippet} onSelect={() => this.onSelectVideo(video)} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

const mapStateToProps = store => ({
  videos: store.videos.videos,
  loading: store.videos.loading,
  query: store.form.searchForm.values.query,
});
const mapDispatchToProps = dispatch => ({
  selectVideo: video => dispatch(actions.selectVideo(video)),
  getTrendingVideos: () => dispatch(actions.getTrendingVideos()),
  goToVideoScreen: () => dispatch(push('/video')),
});

const StyledHomeScreen = withStyles(styles)(HomeScreen);

export default connect(mapStateToProps, mapDispatchToProps)(StyledHomeScreen);
