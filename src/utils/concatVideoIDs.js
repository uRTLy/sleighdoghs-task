export default function concatVideoIDs(videos) {
  return videos.map(video => (typeof video.id === 'object' ? video.id.videoId : video.id)).join(',');
}
