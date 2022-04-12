export default class ApiCountries {

    constructor() {}

fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(Response => Response.json())
}
}
