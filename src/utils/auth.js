class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(endpoit, options = {}) {
    return fetch(`${this._baseUrl}${endpoit}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }).then(this._isItOk);
  }



  userUpdate() {

  }

  _isItOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }
}

const auth = new Auth({
  baseUrl: "http://localhost:3002",
  // baseUrl: "https://api.uncle.movies.nomoredomainsicu.ru",
  // baseUrl: "http://localhost:3000",
});

export default auth;
