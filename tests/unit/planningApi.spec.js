import planningApi from "../../src/api/planningApi"
// import { shallowMount } from '@vue/test-utils'
import {expect}  from 'chai';
let faker = require('faker')

describe('Planning Api', () => {

    const validEmail = 'email_3@email.com'
    const validPassword = 'password'

    faker.locale = "fr"
    const randomEmail = faker.internet.email()
    const randomName = faker.name.findName()
    const randomPhone = '0615120123'
    async function token()
    {
        return await planningApi.login(validEmail, validPassword)
    }


    it('connect with valid credentials return token', function () {
        return planningApi.login(validEmail, validPassword).then(
            (token) => {
                expect(token).to.match(/[a-zA-Z0-9_.]+/)
            }
        )
    });

    it('connect with bad credentials return error', function () {
        return planningApi.login('bad-email', 'bad-password').catch(reason => {
            expect(reason.message).equal('Bad credentials', reason)
        })
    });


    it('create one user', function () {
        return planningApi.createOneUser(randomName, randomEmail, 'password', 'password', '1900-05-21').then(
            (data) => {
                return expect(data).to.be.eql({
                    email: randomEmail,
                    phoneNumber: null,
                    birthday: '1900-05-21',
                    home: null,
                    work: null,
                    name: randomName,
                });
            })
    });

    it('create one user with bad birthday fail', function () {
        return planningApi.createOneUser(randomName, 'bobb@email.com', 'password', 'password', 'bad-birthday').catch(reason => {
            expect(reason.message).equal('birthday MUST to be in format yyyy-mm-dd', reason)
        })
    });

    it('create one user not email format', function () {
        return planningApi.createOneUser(randomName, '1234', 'password', 'password', '1900-05-21').catch(reason => {
            expect(reason.message).equal('email MUST to be a valid email', reason)
        })
    });

    it('create one user email duplicated', function () {
        return planningApi.createOneUser('bob', validEmail, 'password', 'password', '1900-05-21').catch(reason => {
            expect(reason.message).contain('Duplicate', reason)
        })
    });

    it('update one user', function () {
        return token().then(token => {
            console.log(token)
            return planningApi.setToken(token).updateUser(randomName, randomEmail, '1999-12-05', randomPhone , 'maison', 'PDG').then(
                (data) => {
                    expect(data).to.be.eql({
                        email: randomEmail,
                        phoneNumber: randomPhone,
                        birthday: '1900-05-21',
                        home: 'maison',
                        work: 'PDG',
                        name: randomName,
                    });
                })
        })
    });

    it('create one planning', function () {
        return token().then(token => {
            return planningApi.setToken(token).createOnePlanning(randomName).then((response) => {
                console.log(response.data)
                expect(response.data);
            })
        })
    });

    it('update one Planning', function () {
        return token().then(token => {
            console.log(token)
            return planningApi.setToken(token).updatePlanning(randomName).then(
                (data) => {
                    expect(data).to.be.eql({
                        name: randomName,
                    });
                })
        })
    });



})
