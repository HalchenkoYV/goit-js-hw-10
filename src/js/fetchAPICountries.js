import Notiflix from 'notiflix';
export default class FetchAPICountries {
    constructor() {
        this.searchQuery = '';   
    }
    
    fetchCountries(searchQuery) {
        const url = `https://restcountries.com/v2/name/${this.searchQuery}`
  
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            })
    }

    get query(){
        return this.searchQuery
    }
    
    set query(newQuery){
        this.searchQuery = newQuery;
    }
}


 