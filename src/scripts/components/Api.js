import {
    HEADERS,
    cardsURL,
    userURL,
    changeAvatarUrl
} from '../utils/constants';

export default class Api {
  constructor() {
  }

  static async _send(url, payload) {
      const res = await fetch(url, { ...payload, ...HEADERS});
      if (res.ok) return await res.json()
      throw new Error(`Ошибка ${payload.method} url=${url} status=${res.status}`);
  }

  static async _get(url) {
    const payload = { method: 'GET' }
    return await Api._send(url, payload)
  }

  static async _post(url, body) {
    const payload = { method: 'POST', body: body  }
    return await Api._send(url, payload)
  }

  static async _patch(url, body) {
    const payload = { method: 'PATCH', body: body  }
    return await Api._send(url, payload)
  }

  static async _put(url) {
    const payload = { method: 'PUT'}
    return await Api._send(url, payload)
  }

  static async _delete(url) {
    const payload = { method: 'DELETE' }
    return await Api._send(url, payload)
  }

  static async getInitialCards() {
    return await Api._get(cardsURL);
  }

  static async getUserInfo() {
    return await Api._get(userURL);
  }

  static async updateUserInfo(data) {
    const body = JSON.stringify({ ...data })
    return await Api._patch(userURL, body);
  }

  static async addNewCard(data) {
    const body = JSON.stringify({ ...data })
    return await Api._post(cardsURL, body);
  }

  static async changeAvatar(data) {
    const body = JSON.stringify({ ...data })
    return await Api._patch(changeAvatarUrl, body);
  }

  static async deleteCard(cardId) {
    const url = `${cardsURL}/${cardId}`
    return await Api._delete(url);
  }

  static async addLike(cardId) {
    const url = `${cardsURL}/${cardId}/likes`
    return await Api._put(url);
  }

  static async deleteLike(cardId) {
    const url = `${cardsURL}/${cardId}/likes`
    return await Api._delete(url);
  }

}
