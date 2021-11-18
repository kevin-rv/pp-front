import { shallowMount } from '@vue/test-utils'
import {expect}  from 'chai'
import Signin from "../../src/components/Signin";

describe('Signin component', () => {

    it('signin email name password are present', function () {
        const signin = shallowMount(Signin)

        expect(signin.find('input[type="email"]').exists()).to.be.true
        expect(signin.find('input[type="text"]').exists()).to.be.true
        expect(signin.find('input[type="password"]').exists()).to.be.true
        expect(signin.find('button[type="button"]').exists()).to.be.true

        // signin.vm.submit()
    });
})
