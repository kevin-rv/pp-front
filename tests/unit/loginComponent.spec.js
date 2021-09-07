import { shallowMount } from '@vue/test-utils'
import {expect}  from 'chai'
import Login from "../../src/views/Login";

describe('Login component', () => {

    it('login, password and submit are present', function () {
        const login = shallowMount(Login)

        expect(login.find('input[type="email"]').exists()).to.be.true
        expect(login.find('input[type="password"]').exists()).to.be.true
        expect(login.find('button[type="button"]').exists()).to.be.true
    });

    it('login, password models works', function () {
        const login = shallowMount(Login)

        login.setData({
            email: 'email@email.com',
            password: 'password',
        })

        console.log(login.vm.$data)

        login.find('input[type="email"]').setValue('new-email@email.com')

        console.log(login.vm.$data)

        expect(login.vm.$data.email).to.be.equal('new-email@email.com')

        // expect(login.find('input[type="email"]').element.value).to.be.equal('email@email.com')
    });
})
