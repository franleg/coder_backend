import Supertest from 'supertest';
import Chai from 'chai';
import { __dirname } from './utils.js';

const expect = Chai.expect;
const requester = Supertest('http://localhost:8080');

describe('Users testing', () => {
    describe('GETS', () => {
        it('La petición base debe retornar un arreglo de usuarios', async () => {
            let response = await requester.get('/api/users');
            const { _body } = response;
            expect(_body.payload).to.be.an('array');
        })
    })
    describe('POST', () => {
        it('Se debería poder llevar a cabo el registro de un nuevo usuario', async () => {
            const password = '123'
            const response = await requester.post('/api/sessions/register')
                                            .set('Content-Type', 'application/x-www-form-urlencoded')
                                            .field('first_name', 'Martin')
                                            .field('last_name', 'Fiori')
                                            .field('age', 25)
                                            .field('adress', 'Villa Ballester')
                                            .field('phone', 1184932190)
                                            .field('email', 'martin@correo.com')
                                            .field('password', password)
                                            .attach('avatar', __dirname + '/public/img/1669217513217-compacteras.700.jpg')
            const { _body } = response;
            console.log(_body);
            expect(_body.payload).to.include.keys('_id', 'password');
        })

        it('Se debería poder llevar a cabo el inicio de sesión de un usuario existente', async () => {
            const password = '123'
            const user = {
                email: 'martin@correo.com',
                password
            }
            const response = await requester.post('/api/sessions/login').send(user)
            console.log(response.headers['set-cookie'].pop().split(';')[0]);
            expect(response.headers).to.include.keys('set-cookie')
        })
    })

})

describe('Products testing', () => {
    describe('GET', () => {
        it('Debería devolver un producto por su id', async () => {
            const id = '636ac7584ed95002f80be50b';
            let response = await requester.get(`/api/products/${id}`)
            const { _body } = response;
            console.log(_body)
            expect(_body.payload).to.be.an('object').and.to.include.key('_id');
        })
    })

    describe('POST', () => {
        it('Debería poder crearse un nuevo producto', async () => {
            const response = await requester.post('/api/products')
                                            .set('Content-Type', 'application/x-www-form-urlencoded')
                                            .field('title', 'KRK G3')
                                            .field('price', 120000)
                                            .field('description', 'monitores')
                                            .field('stock', 10)
                                            .attach('thumbnail', __dirname + '/public/img/1667942272383-monitores.krk.jpg')
            const { _body } = response;
            console.log(_body);
            expect(_body.payload).to.be.an('object').and.to.include.keys('title', 'price', 'description', 'stock', 'thumbnail')
        })
    })

    describe('PUT', () => {
        it('Debería poder actualizarse un producto', async () => {
            const id = '6380c66b4a4a0d54cd685225'
            const response = await requester.put(`/api/products/${id}`)
                                            .set('Content-Type', 'application/x-www-form-urlencoded')
                                            .field('title', 'Sennheiser HD-25')
                                            .field('price', 280000)
                                            .field('description', 'Auriculares')
                                            .field('stock', 10)
                                            .attach('thumbnail', __dirname + '/public/img/1668612689300-auris.sennheiser.jpg')
            const { _body } = response;
            console.log(_body);
            expect(_body.payload).to.be.an('array');
        })
    })

    describe('DELETE', () => {
        it('Debería poder eliminarse un producto por su id', async () => {
            const id = '6380c84b4a4a0d54cd68522f'
            const response = await requester.delete(`/api/products/${id}`)
            expect(response.status).to.be.equal(200);
        })
    })
})