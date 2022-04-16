import './css/styles.css';
import countryFullInfo from './templates/country-full-info.hbs';
import countryInfo from './templates/country.hbs';
import debounce from 'lodash.debounce';
import ApiCountries from './sass/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const newApiCountries = new ApiCountries();

const refs = {
    inputEl : document.querySelector('#search-box'),
    countryListEl : document.querySelector('.country-list'),
    countryFullInfoEl : document.querySelector('.country-info')
}

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event){
    const inputValue = event.target.value.trim();
    if(inputValue.length === 0){
        clearInfo();
        return;
    }
    newApiCountries.fetchCountries(inputValue)
    .then(data => {
        if(data.length > 10){
            clearInfo();
            Notify.info('Too many matches found. Please enter a more specific query!');
            return;
        }
            else if(data.length === 1){
                clearInfo();
                listСountries(data);
                listСountriesFullInfo(data);
            }
                else if(data.length > 1){
                    clearInfo();
                    listСountries(data);
                }
    })
    .catch(error => {
        Notify.failure("Oops, there is no country with that name");
    })
}                       

function listСountries(data){
    refs.countryListEl.innerHTML = data.map(country => countryInfo(country)).join('');
}

function listСountriesFullInfo(data){
    refs.countryFullInfoEl.innerHTML = data.map(country => countryFullInfo(country)).join('');
}

function clearInfo(){
    refs.countryListEl.innerHTML = '';
    refs.countryFullInfoEl.innerHTML = '';
}
