const searchBtn = document.getElementById('searchbtn');
const mainDiv = document.getElementById('mainDiv');
const searchBar = document.getElementById('searchBar');

searchBtn.addEventListener('click', fetchData);

function fetchData() {
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        const destArray = Object.entries(data);
        // console.log(destArray);
        // console.log(searchBar.value.toLowerCase());
        const countries = destArray[0][1];
        const cities = countries.map(country => country.cities);
        console.log(cities);
    });
}