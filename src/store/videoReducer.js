import { api, delay, concatVideoIDs } from '../utils';

const SELECT = 'video/select';

const RATE = 'video/rate';
const RATE_SUCCESS = 'video/rateSuccess';
const RATE_FAILED = 'video/rateFailed';

const GET_TRENDING_VIDEOS = 'video/getTrendingVideos';
const GET_TRENDING_VIDEOS_SUCCESS = 'video/getTrendingVideosSuccess';
const GET_TRENDING_VIDEOS_FAILED = 'video/getTrendingVideosFailed';

const GET_RATINGS = 'video/getRatings';
const GET_RATINGS_SUCCESS = 'video/getRatingsSuccess';
const GET_RATINGS_FAILED = 'video/getRatingsFailed';

const SEARCH = 'video/search';
const SEARCH_SUCCESS = 'video/searchSuccess';
const SEARCH_FAILED = 'video/searchFailed';

const initialState = {
  selectedVideo: {
    placeholderVideo: true,
    id: '',
    snippet: {
      title: '',
      channelTitle: '',
      description: '',
    },
    rating: 'none',
  },
  loading: false,
  afterFirstSelect: false,
  videos: [],
  videosRatings: [],
  errors: [],
};

function mergeRatingsWithVideos(videos, ratings) {
  const sortedVideos = videos.slice().sort(video => video.videoId);
  const sortedRatings = ratings.slice().sort(rating => rating.videoId);
  return sortedVideos.map((video, index) => Object.assign({}, video, { rating: sortedRatings[index].rating }));
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_TRENDING_VIDEOS:
    case SEARCH:
      return {
        ...state,
        loading: true,
      };

    case GET_RATINGS:
      return {
        ...state,
        loading: true,
      };

    case GET_TRENDING_VIDEOS_SUCCESS:
    case SEARCH_SUCCESS:
      const videos =
        state.videosRatings.length > 0 ? mergeRatingsWithVideos(action.videos, state.videosRatings) : action.videos;
      return {
        ...state,
        loading: false,
        videos,
        selectedVideo: state.selectedVideo.placeholderVideo ? videos[0] : state.selectedVideo,
      };

    case GET_RATINGS_FAILED:
    case RATE_FAILED:
    case GET_TRENDING_VIDEOS_FAILED:
    case SEARCH_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case SELECT:
      return {
        ...state,
        afterFirstSelect: true,
        selectedVideo: action.video,
      };

    case RATE:
      const selectedVideo = Object.assign({}, state.selectedVideo, { rating: action.rating });
      const videoIndex = state.videos.indexOf(state.selectedVideo);
      const newVideos = state.videos.map((video, index) => (index === videoIndex ? selectedVideo : video));
      return {
        ...state,
        selectedVideo,
        videos: newVideos,
      };

    case GET_RATINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        videosRatings: action.videosRatings,
        videos: mergeRatingsWithVideos(state.videos, action.videosRatings),
      };

    default:
      return state;
  }
}

export function selectVideo(video) {
  return { type: SELECT, video };
}

export function search(query) {
  return async (dispatch, getState) => {
    dispatch({ type: SEARCH });

    try {
      const videos = await api.search(query);

      const { isAuthenticated } = getState().auth;

      if (isAuthenticated) {
        await dispatch(getRatings(videos.result.items));
      }
      dispatch({ type: SEARCH_SUCCESS, videos: videos.result.items });
    } catch (e) {
      dispatch({ type: SEARCH_FAILED, error: e });
    }
  };
}

export function rate(id, rating) {
  return async dispatch => {
    dispatch({ type: RATE, rating });

    try {
      await api.rate(id, rating);
      dispatch({ type: RATE_SUCCESS });
    } catch (e) {
      dispatch({ type: RATE_FAILED, error: e });
    }
  };
}

export function getRatings(videos) {
  return async dispatch => {
    dispatch({ type: GET_RATINGS });
    try {
      const videosRatings = await api.getVideosRatings(concatVideoIDs(videos));

      dispatch({ type: GET_RATINGS_SUCCESS, videosRatings: videosRatings.result.items });
    } catch (e) {
      dispatch({ type: GET_RATINGS_FAILED, error: e });
    }
  };
}

export function getTrendingVideos() {
  return async (dispatch, getState) => {
    dispatch({ type: GET_TRENDING_VIDEOS });
    try {
      const trendingVideos = await api.getTrendingVideos();

      const { isAuthenticated } = getState().auth;

      if (isAuthenticated) {
        await dispatch(getRatings(trendingVideos.result.items));
      }

      dispatch({ type: GET_TRENDING_VIDEOS_SUCCESS, videos: trendingVideos.result.items });
    } catch (e) {
      dispatch({ type: GET_TRENDING_VIDEOS_FAILED, error: e });
    }
  };
}
