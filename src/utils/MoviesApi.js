class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _request(endpoit, options = {}) {
    return fetch(`${this._baseUrl}${endpoit}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }).then(this._isItOk);
  }

  getMovies() {
    return this._request("/")
  }

  _isItOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies"
});
