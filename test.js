import { expect } from 'chai'
import { findLocationBy } from './find_locations.js'

describe('Find Locations by City and Place or State Code', async () => {
    it('@find location by city name only', async () => {
        const cityName = ['Denver']
        const response = (await findLocationBy(cityName))[0]
        expect(response.status).to.equal(200, `Failed to find locations for city name "${cityName}"`)
        expect(response.data).to.have.property('name')
        expect(response.data).to.have.property('local_names')
        expect(response.data.local_names).to.have.keys('en', 'bn', 'fa', 'ur', 'ko', 'oc', 'ja', 'es', 'ar', 'eo', 'el',
            'hi', 'mr', 'pl', 'ps', 'ru', 'ta', 'te', 'uk', 'zh')
        expect(response.data).to.have.property('lat')
        expect(response.data).to.have.property('lon')
        expect(response.data).to.have.property('country')
        expect(response.data.country.toLowerCase()).to.equal('us')
        expect(response.data).to.have.property('state')
        expect(response.data.state.toLowerCase()).to.equal('colorado')
    })

    it('@find location by city and place combination', async () => {
        const cityAndPlace = ['San Mateo, CA']
        const response = (await findLocationBy(cityAndPlace))[0]
        expect(response.status).to.equal(200, `Failed to find locations for city ahd place "${cityAndPlace}"`)
        expect(response.data).to.have.property('name')
        expect(response.data).to.have.property('local_names')
        expect(response.data.local_names).to.include.any.keys('en', 'bn', 'fa', 'ur', 'ko', 'oc', 'ja', 'es', 'ar', 'eo', 'el',
            'hi', 'mr', 'pl', 'ps', 'ru', 'ta', 'te', 'uk', 'zh')
        expect(response.data).to.have.property('lat')
        expect(response.data).to.have.property('lon')
        expect(response.data).to.have.property('country')
        expect(response.data.country.toLowerCase()).to.equal('us')
        expect(response.data).to.have.property('state')
        expect(response.data.state.toLowerCase()).to.equal('california')
    })

    it('@find location by city and place combination and zipcode', async () => {
        const cityAndPlace = ['Westminster, CO', '80234']
        const response = (await findLocationBy(cityAndPlace))[0]
        expect(response.status).to.equal(200, `Failed to find locations for city ahd place "${cityAndPlace}"`)
        expect(response.data).to.have.property('name')
        expect(response.data).to.have.property('local_names')
        expect(response.data.local_names).to.include.any.keys('en', 'bn', 'fa', 'ur', 'ko', 'oc', 'ja', 'es', 'ar', 'eo', 'el',
            'hi', 'mr', 'pl', 'ps', 'ru', 'ta', 'te', 'uk', 'zh')
        expect(response.data).to.have.property('lat')
        expect(response.data).to.have.property('lon')
        expect(response.data).to.have.property('country')
        expect(response.data.country.toLowerCase()).to.equal('us')
        expect(response.data).to.have.property('state')
        expect(response.data.state.toLowerCase()).to.equal('colorado')
    })

    it('@find location by multiple cities and places combination', async () => {
        const cityAndPlace = ['San Mateo, CA', 'Westminster, CO']
        const response = (await findLocationBy(cityAndPlace))[0]
        expect(response.status).to.equal(200, `Failed to find locations for city ahd place "${cityAndPlace}"`)
        expect(response.data).to.have.property('name')
        expect(response.data).to.have.property('local_names')
        expect(response.data.local_names).to.include.any.keys('en', 'bn', 'fa', 'ur', 'ko', 'oc', 'ja', 'es', 'ar', 'eo', 'el',
            'hi', 'mr', 'pl', 'ps', 'ru', 'ta', 'te', 'uk', 'zh')
        expect(response.data).to.have.property('lat')
        expect(response.data).to.have.property('lon')
        expect(response.data).to.have.property('country')
        expect(response.data.country.toLowerCase()).to.equal('us')
        expect(response.data).to.have.property('state')
        expect(response.data.state.toLowerCase()).to.equal('california')

        // could validate city #2 (Westminster, CO) here but this test is show that Utility can handle multiple places
    })

    it('@find location by zip code only', async () => {
        const zipCode = ['80234']
        const response = (await findLocationBy(zipCode))[0]
        expect(response.status).to.equal(200, `Failed to find locations for zipcode "${zipCode}"`)
        expect(response.data).to.have.property('zip')
        expect(response.data).to.have.property('name')
        expect(response.data).to.have.property('lat')
        expect(response.data).to.have.property('lon')
        expect(response.data).to.have.property('country')
        expect(response.data.country.toLowerCase()).to.equal('us')
    })

    it('@find location by multiple zip codes', async () => {
        const zipCode = ['80234', '12345']
        const response = (await findLocationBy(zipCode))[0]
        expect(response.status).to.equal(200, `Failed to find locations for zipcode "${zipCode}"`)
        expect(response.data).to.have.property('zip')
        expect(response.data).to.have.property('name')
        expect(response.data).to.have.property('lat')
        expect(response.data).to.have.property('lon')
        expect(response.data).to.have.property('country')
        expect(response.data.country.toLowerCase()).to.equal('us')
    })

    it('@find location by zip code and city, place', async () => {
        const zipCode = ['80234', 'Westminster, CO']
        const response = (await findLocationBy(zipCode))[0]
        expect(response.status).to.equal(200, `Failed to find locations for zipcode "${zipCode}"`)
        expect(response.data).to.have.property('zip')
        expect(response.data).to.have.property('name')
        expect(response.data).to.have.property('lat')
        expect(response.data).to.have.property('lon')
        expect(response.data).to.have.property('country')
        expect(response.data.country.toLowerCase()).to.equal('us')
    })

    it('@find location by invalid zip code', async () => {
        const zipCode = ['802']
        const response = (await findLocationBy(zipCode))[0]
        expect(response.status).to.equal(404, `Zip code "${zipCode}" should be invalid`)
    })

    it('@find location by invalid city, place', async () => {
        const cityPlace = ['west3m3nt3r']
        const response = (await findLocationBy(cityPlace))[0]
        expect(response.status).to.equal(404, `City "${cityPlace}" should be invalid`)
    })

    it('@find location by invalid city, place', async () => {
        const zipCode = []
        const response = (await findLocationBy(zipCode))[0]
        expect(response.status).to.equal(404, `city, place "${zipCode}" should be invalid`)
    })
    
})
