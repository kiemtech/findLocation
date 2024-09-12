const apiKey = 'f897a99d971b5eef57be6fafa0d83239'
const countryCode = 'US', userInputs = []

// Read inputs from  user
process.argv.forEach((value, index) => {
  if (index > 1) {
    userInputs.push(value)
  }
});

// Display location information as per user inputs
if (userInputs.length > 0) {
  console.log('YOUR INPUT IS >>>>>>>>>>> ' +userInputs)
  let userOutputs = await findLocationBy(userInputs)
  await displayLocationInfo(userInputs, userOutputs)
} else {
  console.log('PLEASE ENTER "city,place" or "zipcode" YOU WANT TO SEARCH FOR.')
}
/**
 * Takes in an array of city, place and/or zipcode, find the locations and return them.
 * @param Array - cityZipcodeArray: contains "city,place" or "zipcode" or combination of 1 or more "city, place" and "zipcode"
 * @return {Array} - locations found associate with user inputs
 */
async function findLocationBy(cityZipcodeArray) {
  const userOutputs = []
  if (!cityZipcodeArray || cityZipcodeArray.length == 0) {
    const message = 'REQUIRED >>>>>>>>> "city,place", "zipcode" or multiple "city, place" or "zip codes"'
    console.warn(`WARNING: ${message}`)
    userOutputs.push({ status: 404})
    return userOutputs
  }
  for (let index = 0; index < cityZipcodeArray.length; index++) {
    if (cityZipcodeArray[index].match(/\d/)) {
      const response = await searchByZipCode(cityZipcodeArray[index])
      userOutputs.push(response)
    } else {
      const response = await searchByCityPlace(cityZipcodeArray[index])
      userOutputs.push(response)
    }
  }
  return userOutputs
}

async function searchByZipCode(value) {
  const zipEndpoint = `http://api.openweathermap.org/geo/1.0/zip?zip=${value},${countryCode}&appid=${apiKey}`
  const response = await fetch(zipEndpoint)
  const data = await response.json()
  // Print out data retrieved
  // console.log('DATA RETRIEVED >>>>>>>> ' +JSON.stringify(data))
  return {
    status: response.status,
    data: data
  }
}

async function searchByCityPlace(value) {
  const placeEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${value},${countryCode}&limit=5&appid=${apiKey}`
  const response = await fetch(placeEndpoint)
  const data = await response.json()
  // Print out data retrieved
  // console.log('DATA RETRIEVED >>>>>>>> ' +JSON.stringify(data[0]))
  return {
    status: response.status,
    data: data[0]
  }
}

async function displayLocationInfo(userInputs, userOutputs) {
  for (let index = 0; index < userOutputs.length; index++) {
    if (userOutputs[index].status === 200) {
      console.log(`LOCATION FOUND FOR "${userInputs[index]}" >>>>>>>>>>>> ${JSON.stringify(userOutputs[index].data)}`)
    } else {
      console.log(`UNABLE TO FIND LOCATION FOR "${userInputs[index]}"`)
    }
  }
}

export { findLocationBy }