class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  /* --- ВНУТРЕННИЕ МЕТОДЫ --- */
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

  _isItOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  /* --- ПОЛЬЗОВАТЕЛЬ --- */
  signUp(userData) {
    return this._request(`/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  signIn(userData) {
    const {email, password} = userData;
    return this._request(`/signin`, {
      method: "POST",
      body: JSON.stringify({email: email, password: password}),
      credentials: "include",
    });
  }

  signOut() {
    return this._request("/signout");
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      method: "GET",
    });
  }

  editUserInfo({name, email}) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });
  }

  /* --- ФИЛЬМЫ --- */
  getMovies() {
    return this._request("/movies");
  }

  saveMovie (card) {
    return this._request(`/movies/`, {
      method: "POST",
      body: JSON.stringify(card),
    });
  }

  deleteMovie (cardId) {
    return this._request(`/movies/${cardId}`, {
      method: "DELETE",
    });
  }
}

export const mainApi = new Api({
  baseUrl: "https://api.uncle.movies.nomoredomainsicu.ru",
  // baseUrl: "http://localhost:3002",
  // baseUrl: "http://localhost:3000",
});
