import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, withStyles } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
const styles = {
  tile: {},
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const VideoListItem = ({ classes, video, onSelect }) => {
  const { title, channelTitle, thumbnails } = video;

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={thumbnails.medium.url} title={title} />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {title}
        </Typography>
        <Typography gutterBottom variant="subheading">
          {channelTitle}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton type="primary" onClick={onSelect}>
          <PlayArrow />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const thumbnailProp = PropTypes.shape({
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
});

VideoListItem.propTypes = {
  video: PropTypes.shape({
    videoId: PropTypes.string,
    title: PropTypes.string,
    channelTitle: PropTypes.string,
    thumbnails: PropTypes.shape({
      default: thumbnailProp,
      medium: thumbnailProp,
      high: thumbnailProp,
    }),
  }),
  onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(VideoListItem);
