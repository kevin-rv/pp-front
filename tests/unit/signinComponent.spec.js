import { shallowMount } from '@vue/test-utils'
import {expect}  from 'chai'
import Signin from "../../src/views/Signin";

describe('Signin component', () => {

    it('signin email name password a present', function () {
        const signin = shallowMount(Signin)

        expect(signin.find('input[type="email"]').exists()).to.be.true
        expect(signin.find('input[v-model="name"]').exists()).to.be.true
        expect(signin.find('input[type="password"]').exists()).to.be.true
        expect(signin.find('button[type="button"]').exists()).to.be.true
    });
})
