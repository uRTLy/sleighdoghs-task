import React, { Component } from 'react';
import PropTypes from 'prop-types';

import YouTubeVideo from 'react-youtube';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  CircularProgress,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ThumbUp, ThumbDown, ExpandMore, ExpandLess } from '@material-ui/icons';

import { limitTo } from '../utils';

const styles = {
  hideOverflow: {
    overflow: 'hidden',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  progressSize: {
    position: 'absolute',
    marginLeft: '50%',
    marginTop: '35%',
    width: 40,
    left: -20,
    top: -20,
  },
  videoContainer: {
    maxHeight: 640,
    maxWidth: 900,
    width: '100%',
    height: '100%',
  },
  player: {
    width: 900,
    height: 640,
  },
  cardContainer: {
    position: 'relative',
    maxWidth: 900,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
};

// RATING CONSTANTS
const [LIKE, DISLIKE, NONE] = ['like', 'dislike', 'none'];

class VideoFrame extends Component {
  state = {
    frameLoading: true,
    expanded: false,
  };
  onReady = () => {
    this.props.onLoad();
    this.setState({ frameLoading: false });
  };
  onRate = rating => {
    const { videoId } = this.props;
    if (this.props.video.rating === rating) {
      this.props.onRate(videoId, NONE);
    } else {
      this.props.onRate(videoId, rating);
    }
  };
  render() {
    const { videoId, video, isAuthenticated, opts, classes } = this.props;

    return (
      <Card className={classes.cardContainer}>
        {this.state.frameLoading && <CircularProgress size={40} className={classes.progressSize} />}
        <YouTubeVideo videoId={videoId} opts={opts} onReady={this.onReady} className={classes.player} />
        <div className={classes.spaceBetween}>
          <CardHeader title={video.title} subheader={video.channel} className={classes.header} />

          <CardActions className={classes.actionsRight}>
            <IconButton onClick={() => this.onRate(LIKE)} disabled={!isAuthenticated}>
              <ThumbUp color={video.rating === LIKE ? 'primary' : 'inherit'} />
            </IconButton>
            <IconButton onClick={() => this.onRate(DISLIKE)} disabled={!isAuthenticated}>
              <ThumbDown color={video.rating === DISLIKE ? 'primary' : 'inherit'} />
            </IconButton>
          </CardActions>
        </div>

        {!this.state.expanded && (
          <CardContent className={classes.spaceBetween}>
            <Typography component="p">{limitTo(video.description, 250)}</Typography>
            <IconButton onClick={() => this.setState({ expanded: !this.state.expanded })}>
              <ExpandMore />
            </IconButton>
          </CardContent>
        )}

        <Collapse in={this.state.expanded} unmountOnExit className={classes.spaceBetween}>
          <CardContent>
            <Typography component="p">{video.description}</Typography>
          </CardContent>
          <IconButton onClick={() => this.setState({ expanded: !this.state.expanded })}>
            <ExpandLess />
          </IconButton>
        </Collapse>
      </Card>
    );
  }
}

VideoFrame.propTypes = {
  onLoad: PropTypes.func,
  onRate: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired,
  video: PropTypes.shape({
    title: PropTypes.string,
    channel: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.string,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  opts: PropTypes.object,
};

VideoFrame.defaultProps = {
  opts: {
    width: '100%',
    height: '100%',
  },
  onLoad: () => {},
};

export default withStyles(styles)(VideoFrame);
