import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid, withStyles } from '@material-ui/core';

import { Sidebar, VideoFrame } from '../components';

import { actions } from '../store';

const styles = {
  main: {
    justifyContent: 'center',
    display: 'flex',
  },
  sidebar: {
    overflow: 'auto',
    maxHeight: '90vh',
  },
};

class VideoScreen extends Component {
  componentDidMount() {
    if (this.props.videos.length === 0) {
      this.props.getTrendingVideos();
    }
  }
  render() {
    const { videos, selectedVideo, loading, isAuthenticated, classes } = this.props;

    const selectedVideoId = typeof selectedVideo.id === 'object' ? selectedVideo.id.videoId : selectedVideo.id;

    return (
      <Grid container wrap="wrap" direction="row" justify="center" spacing={24}>
        <Grid item className={classes.main}>
          <VideoFrame
            isAuthenticated={isAuthenticated}
            videoId={selectedVideoId}
            video={{
              title: selectedVideo.snippet.title,
              channel: selectedVideo.snippet.channelTitle,
              rating: isAuthenticated ? selectedVideo.rating : 'none',
              description: selectedVideo.snippet.description,
            }}
            onRate={this.props.rate}
          />
        </Grid>
        <Grid item className={classes.sidebar}>
          <Sidebar onSelect={this.props.selectVideo} videos={videos} loading={loading} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = store => ({ ...store.videos, isAuthenticated: store.auth.isAuthenticated });

const mapDispatchToProps = dispatch => ({
  selectVideo: video => dispatch(actions.selectVideo(video)),
  getTrendingVideos: () => dispatch(actions.getTrendingVideos()),
  getRatings: () => dispatch(actions.getRatings()),
  rate: (id, rating) => dispatch(actions.rate(id, rating)),
});

const StyledVideoScreen = withStyles(styles)(VideoScreen);

export default connect(mapStateToProps, mapDispatchToProps)(StyledVideoScreen);
