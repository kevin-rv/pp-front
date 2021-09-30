import { shallowMount } from '@vue/test-utils'
import chai  from 'chai'
import spies  from 'chai-spies'
chai.use(spies)
let expect = chai.expect
import Login from "../../src/views/Login";

describe('Login component', () => {

    it('login, password and submit are present', function () {
        const login = shallowMount(Login)

        expect(login.find('input[type="email"]').exists()).to.be.true
        expect(login.find('input[type="password"]').exists()).to.be.true
        expect(login.find('button[type="button"]').exists()).to.be.true
    });

    it('login, password models works', function () {
        const loginFunc = chai.spy(Login.methods.login)
        Login.methods.login = loginFunc

        const login = shallowMount(Login)

        login.setData({
            email: 'email@email.com',
            password: 'password',
        })

        login.find('input[type="email"]').setValue('new-email@email.com')
        login.find('input[type="password"]').setValue('new-password')
        expect(login.vm.$data.email).to.be.equal('new-email@email.com')
        expect(login.vm.$data.password).to.be.equal('new-password')

        login.find('button[type="button"]').trigger('click')
        expect(loginFunc).have.been.called()
    });
})
