import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CircularProgress, Typography, withStyles } from '@material-ui/core';

import { VideoListItem } from '../components';

const styles = {
  limitHeight: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    width: 330,
    position: 'relative',
  },
  progressLoader: {
    position: 'absolute',
    marginLeft: '50%',
    top: 50,
    width: 40,
    left: -20,
  },
  gridHeader: {
    textAlign: 'left',
  },
};

class Sidebar extends Component {
  render() {
    const { classes, videos, loading, onSelect } = this.props;

    return (
      <div className={classes.limitHeight}>
        <Typography> Similar Videos </Typography>
        {!loading &&
          videos.map((video, i) => <VideoListItem video={video.snippet} onSelect={() => onSelect(video)} key={i} />)}
        {loading && <CircularProgress className={classes.progressLoader} />}
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(Sidebar);
