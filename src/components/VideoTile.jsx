import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  withStyles,
} from '@material-ui/core';

import { limitTo } from '../utils';

const styles = theme => ({
  header: {
    fontSize: 12,
  },
  media: {
    height: 280,
    width: '100%',
  },
});

class VideoTile extends Component {
  render() {
    const { classes, video } = this.props;
    return (
      <Card>
        <CardMedia image={video.thumbnails.high.url} title={video.title} className={classes.media} />
        <CardHeader title={video.title} subheader={video.channelTitle} className={classes.header} />
        <CardContent>
          <Typography component="p">{limitTo(video.description, 150)}</Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={this.props.onSelect}>
            Play
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const thumbnailProp = PropTypes.shape({
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
});

VideoTile.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    publishedAt: PropTypes.string,
    thumbnails: PropTypes.shape({
      default: thumbnailProp,
      medium: thumbnailProp,
      high: thumbnailProp,
    }),
    channelId: PropTypes.string,
    channelTitle: PropTypes.string,
    liveBroadcastContent: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(VideoTile);
