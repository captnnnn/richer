import { ApolloClient, createNetworkInterface } from 'react-apollo';

// NOTE: this file is for setting csrf and other stuff before client can make ajax calls
// this is very similar to what we are trying to achienve at /static/ajax_setup.js


const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    // credentials: 'same-origin',
    credentials: 'include',
  },
  // transportBatching: true,
});

function redirectIf403(response) {
  // TODO: extend this so it also works on GraphQL errors where the status is 200 and the error is in the body
  if (response.status === 403) {
    window.location = '/accounts/login/';
    return true;
  }
  return false;
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = window.jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function setDefaultHeaders(req) {

  const ajaxToken = (new RegExp(`(?:^|; )${encodeURIComponent('ajaxtoken')}=([^;]*)`).exec(document.cookie) || [
    null,
    null,
  ])[1];

  const a = document.createElement('a');
  a.href = req.url;
  // The below check for !a.host is because IE for relative URLs i.e. (/my_fav_api)
  //  doesn't put anything in host which is a reasonable choice.
  if (!a.host || a.host === window.location.host) {
    req.options.headers['X-CSRFToken'] = getCookie('csrftoken');
    req.options.headers['X-PAGEUrl'] = window.location.href;
    req.options.headers['X-AJAXToken'] = ajaxToken;
  }
}

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }
      req.options.headers.accept = 'application/json';
      setDefaultHeaders(req);
      next();
    },
  },
]);

networkInterface.useAfter([
  {
    applyAfterware({ response }, next) {
      if (!redirectIf403(response)) {
        next();
      }
    },
  },
]);

const client = new ApolloClient({
  networkInterface,
  addTypename: true,
  dataIdFromObject: result => {
    /* eslint-disable no-underscore-dangle */
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    /* eslint-enable no-underscore-dangle */
    return null;
  },
  // shouldBatch: true,
});

export default client;
