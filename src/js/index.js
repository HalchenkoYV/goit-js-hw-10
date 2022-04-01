import '../css/styles.css';
import FetchAPICountries from './FetchAPICountries';
import CountriesTpl from '../countries.hbs';
import CountryTpl from '../country.hbs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  listCountries: document.querySelector('.country-list'),
  aboutCountries: document.querySelector('.country-info'),
};

const fetchAPICountries = new FetchAPICountries();

console.log(refs.listCountries);
refs.searchInput.addEventListener("input", debounce((e)=>selectionOfCountries(e), DEBOUNCE_DELAY));           


function selectionOfCountries(e) {
    e.preventDefault();
    fetchAPICountries.query = e.target.value;//// curentTarget не работает!!!! не могу понять почему
    clearArticlesContainer();
    let objItem = {};
    fetchAPICountries.fetchCountries().then(arrayCountries => {
        console.log(arrayCountries);
        /////ARRAY CONSISTING OF NOT A SINGLE OBJECT
      if ((arrayCountries.length > 10)) {
        arrayCountries = [];
        Notiflix.Notify.info('Too more maches found. Eneter more specific name');
        }
      if (arrayCountries.length > 1) {
        arrayCountries.forEach(element => {
            objItem = {
              flag: element.flags[0],
              name: element.name.common,
            }
          appendCountriesMurkup(objItem);
          // arrayCountries = [];
        });
        }
        /////ARRAY CONSISTING OF A ONE OBJECT
      if (arrayCountries.length == 1) {
        const country = arrayCountries[0];
        const languages = Object.values(country.languages);
        
          objItem = {
          flag: country.flags[0],
          country:   country.name.common,
          capital: country.capital[0],
          population: country.population,
          languages: languages,
          }
          
          appendCountryMurkup(objItem);
        }
        if (arrayCountries.status==404)  {
        // console.log(arrayCountries.status);
        Notiflix.Notify.failure("Oops, there is no country with that name");
        }
    })
      
}


function appendCountriesMurkup(objItem) {
  refs.listCountries.insertAdjacentHTML('beforeend', CountriesTpl(objItem))
}

function appendCountryMurkup(objItem) {
    console.log('3');
  refs.listCountries.insertAdjacentHTML('beforeend',CountryTpl(objItem))
}

function clearArticlesContainer() {
  refs.listCountries.innerHTML = '';
}









