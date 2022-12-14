import { expect } from 'chai';
import { HTTPTransport } from './HTTPTransport'

describe('HTTPtransport testing', function() {
    const http: HTTPTransport = new HTTPTransport();
  
    it('Method get works correctly', () => {
      http.get(`https://ya-praktikum.tech/api/v2/user/1`).then((response) =>
        expect(response).to.have.property('id').and.equal(1)
      );
    });
  
    it('Method post works correctly', () => {
      http.post(`https://ya-praktikum.tech/api/v2/user/search`, {
        headers: {'content-type': 'application/json'},
        data: {login: 'zxcvb'}
      }).then((response) =>
        expect(response).to.have.property('login').and.equal('zxcvb')
      );
    });
  
    it('Method put works correctly', () => {
      http.put(`https://ya-praktikum.tech/api/v2/chats/users`, {
        headers: {'content-type': 'application/json'},
        data: {
          users: [1],
          chatId: 1000
        }
      }).then((response) =>
        expect(response).to.be.equal('Ok')
      );
    });
  
    it('Method delete works correctly', () => {
      http.delete(`https://ya-praktikum.tech/api/v2/chats/users`, {
        headers: {'content-type': 'application/json'},
        data: {
          users: [1],
          chatId: 1000
        }
      }).then((response) =>
        expect(response).to.be.equal('Ok')
      );
    });
  });
