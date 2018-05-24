const SCRIPT_SRC = 'https://apis.google.com/js/api.js';

function loadGapiScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;

    script.addEventListener('load', () => {
      window.gapi.load('client:auth2', {
        callback: resolve,
        onerror: reject,
        timeout: 5000,
        ontimeout: reject,
      });
    });
    document.body.append(script);
  });
}

export default loadGapiScript;
