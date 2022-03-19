import VAR from './view.js';

if (!localStorage.getItem('favoriteCities')) {
    localStorage.setItem("favoriteCities", JSON.stringify({'checked': 'Izhevsk', 'cities': []}));
}


const storage = {
    getFavoriteCities() {
        return JSON.parse(localStorage.getItem("favoriteCities"));
    },

    getCheckedCity() {
        return storage.getFavoriteCities().checked;
    },

    setCheckedCity(cityName) {
        const favoriteCities = storage.getFavoriteCities();
        favoriteCities.checked = cityName;
        storage.saveToLocalStorage(favoriteCities);
    },

    saveFavoriteCities() {
        const favoriteCities = storage.getFavoriteCities();
        if (favoriteCities.cities.includes(VAR.CITY[0].textContent)) return;

        favoriteCities.cities.push(VAR.CITY[0].textContent);
        storage.saveToLocalStorage(favoriteCities);
    },

    saveToLocalStorage(favoriteCities) {
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
    },

    deleteFromLocalStorage() {
        const favoriteCities = storage.getFavoriteCities();
        favoriteCities.cities = favoriteCities.cities.filter(elem => elem !== this.previousElementSibling.innerHTML);
        storage.saveToLocalStorage(favoriteCities);
    },
};



export default storage;