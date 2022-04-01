export default class FetchAPICountries {
    constructor() {
        this.searchQuery = '';   
    }
    
    fetchCountries(searchQuery) {
        const url = `https://restcountries.com/v3/name/${this.searchQuery}`
  
        return fetch(url)
            .then(response => { return response.json() })
            .then(arrayOfCountries => {
                return arrayOfCountries;
            });
    }

    get query(){
        return this.searchQuery
    }
    
    set query(newQuery){
        this.searchQuery = newQuery;
    }
}


 