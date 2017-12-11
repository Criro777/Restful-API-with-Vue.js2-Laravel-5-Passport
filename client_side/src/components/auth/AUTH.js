class AUTH {

  static getToken() {
    let token = localStorage.getItem('token');
    let expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return null;
    }
    if (Date.now() > parseInt(expiration)) {
      this.destroyToken();
      return null;
    }

    return token;
  }

  static setToken(token, expiration) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration);
  }

  static isAuthenticated() {
    if (this.getToken()) {
      return true
    } else {
      return false;
    }
  }

  static destroyToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');

  }
}

export default AUTH
