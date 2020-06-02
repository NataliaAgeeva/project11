export default class Api {
  constructor(options) {
    this.options = options;
  }

    getUserInfo() {
    return fetch(`${this.options.url}users/me`, {
      method: 'GET',
      headers: {
        authorization: this.options.token,
        'Content-Type': this.options.header
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();

        } else {
          return Promise.reject(new Error(res.status));
        }
      })
      .catch((err) => {
        // В случае ошибки соединения здесь может быть
        // более сложная логика обработки ошибок (например можно массив карт из файла подтянуть)
        // это только сейчас мы просто ее передали дальше по цепочке
        return Promise.reject(new Error(err.message));
      });
  }

  getCards() {
    return fetch(this.options.url + 'cards', {
      method: 'GET',
      headers: {
        authorization: this.options.token,
        'Content-Type': this.options.header
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(res.status));
        }
      })
      .catch((err) => {
        return Promise.reject(new Error(err.message));
      });
  }

  patchUserInfo(data) {
    return fetch(`${this.options.url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.options.token,
        'Content-Type': this.options.header
      },
      body: JSON.stringify({
        name: data.name.value,
        about: data.info.value

      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(res.status));
        }
      })
      .catch((err) => {
        return Promise.reject(new Error(err.message));
      });
  }

    postNewCard(data) {
        return fetch(`${this.options.url}cards`, {
            method: 'POST',
            headers: {
                authorization: this.options.token,
                'Content-Type': this.options.header
            },
            body: JSON.stringify({
                name: data.name.value,
                link: data.link.value
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(new Error(res.status));
                }
            })
            .catch((err) => {
                return Promise.reject(new Error(err.message));
            });
    }
}
