import './css/styles.css';
import debounce from 'lodash.debounce';
import ApiCountries from './sass/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const newApiCountries = new ApiCountries();

const refs = {
    inputEl : document.querySelector('#search-box'),
}

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event){
    const inputValue = event.target.value.trim();
    if(inputValue.length === 0){
        return;
    }
    newApiCountries.fetchCountries(inputValue)
    .then(data => {
        if(data.length > 10){
            Notify.info('Too many matches found. Please enter a more specific query!');
            return;
        }
            else if(data.length === 1){
            console.log(data);
            }
                else if(data.length > 1){
                console.log(data);
                }
    })
    .catch(error => {
        Notify.failure("Oops, there is no country with that name");
    })
}                       

