import gapiConfig from './gapiConfig';

class GApi {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.clientId = config.clientId;
    this.scope = config.scope;
    this.discoveryBaseURI = config.discoveryBaseURI;
  }

  async initClient() {
    this.gapi = window.gapi;

    const discoveryDocs = await this.getDiscoveryDocument('/youtube/v3/rest');

    await this.gapi.client.init({
      apiKey: this.apiKey,
      clientId: this.clientId,
      discoveryDocs,
      scope: this.scope,
    });

    await this.gapi.client.load('youtube', 'v3');

    this.GAuthInstance = this.gapi.auth2.getAuthInstance();
  }

  getDiscoveryDocument(servicePath) {
    return fetch(this.discoveryBaseURI + servicePath);
  }

  login() {
    if (this.isAuthenticated()) {
      return { message: 'User is already authenticated' };
    }
    this.GAuthInstance.signIn();

    return new Promise((resolve, reject) => this.GAuthInstance.isSignedIn.listen(resolve));
  }
  logout() {
    this.GAuthInstance.signOut();
    return new Promise((resolve, reject) => this.GAuthInstance.isSignedIn.listen(resolve));
  }
  // listenToAuthChanges() {
  //   return new Promise((resolve, reject) => this.GAuthInstance.isSignedIn.listen(resolve));
  // }

  isAuthenticated() {
    return this.GAuthInstance.isSignedIn.get();
  }

  getUser() {
    if (!this.isAuthenticated()) {
      return {};
    }
    const user = this.GAuthInstance.currentUser.get().w3;

    return {
      name: user.ofa,
      lastName: user.wea,
      fullName: user.ig,
      email: user.U3,
      avatar: user.Paa,
    };
  }
  executeRequest(request) {
    return new Promise((resolve, reject) => request.execute(resolve));
  }

  search(q, options = {}) {
    const request = this.gapi.client.youtube.search.list({
      q,
      part: 'snippet',
      maxResults: 21,
      ...options,
      type: 'video',
    });

    return this.executeRequest(request);
  }
  rate(id, rating) {
    const request = this.gapi.client.youtube.videos.rate({
      id,
      rating,
    });

    return this.executeRequest(request);
  }
  getVideosRatings(id) {
    const request = this.gapi.client.youtube.videos.getRating({
      id,
    });
    return this.executeRequest(request);
  }
  getTrendingVideos() {
    const request = this.gapi.client.youtube.videos.list({
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 21,
    });
    return this.executeRequest(request);
  }
}

export default new GApi(gapiConfig);
