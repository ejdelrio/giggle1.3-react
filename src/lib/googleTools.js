import superagent from 'superagent';

export const getAddress = (coords) => {
  let [lat, long] = coords;
  return superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}`)
  .then(res => {
    res.body.coords = coords;
    return res.body;
  })
};

export const getCoords = (compState) => {
  let {city, state, address} = compState;

  city = city.split(' ').join('+');
  state = state.split(' ').join('+');
  address = address.split(' ').join('+');
  let query = `address=${address}, ${city}, ${state}`

  return new Promise((resolve, reject) => {
    superagent.get(`https://maps.googleapis.com/maps/api/geocode/json?${query}`)
    .then(res => {
      let {geometry} =res.body.results[0];
      if(!geometry) reject(new Error('The address you entered is invalid'));
      let loc = geometry.location;
      let {lat, lng} = loc;
      resolve([lat, lng]);
    });
  })
};

export const geoCall = () => {
  let {geolocation} = navigator;

  if(!geolocation) return new Error('Your Browser Does Not Support Geolocation Lookups');

  return new Promise(resolve => {
    geolocation.getCurrentPosition(pos => {
      let {latitude, longitude} = pos.coords;
       resolve([latitude, longitude]);
     })
  });
}

export const formatAddress = (results, coords) => {
  let main = results[0].address_components;
  let address = main[0].long_name;
  let street = main[1].short_name;
  let city = main[3].short_name;
  let state = main[5].long_name;

  let newState = {
    address: `${address} ${street}`,
    city,
    state,
    coords
  }

  return newState;
}
