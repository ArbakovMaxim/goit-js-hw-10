export default class ApiCountries {

    constructor() {}

fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response =>{
            if(response.ok){
            return response.json()
            }
                Notify.failure("Oops, there is no country with that name");
    })
    
}
}
