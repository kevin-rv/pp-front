// import { expect } from 'chai'
// import { shallowMount } from '@vue/test-utils'
import PublicHolidayApi from "../../src/api/publicHolidayApi";

describe('Public Holiday', () => {
  it('...', () => {
    const ph = new PublicHolidayApi
    return ph.getHolidays()
  })
})
