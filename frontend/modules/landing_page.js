import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  
  let cities = await fetchCities();
  
   
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let data = await fetch(`${config.backendEndpoint}/cities`);
    let result = await data.json();
    return result;
  }catch(err) {
    // catches errors both in fetch and response.json
    
    return null;
  }
 

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
   
//   <div class="col-12 col-sm-6 col-lg-3 mb-4">
//   <a href="pages/adventures/">
//     <div class="tile">
//       <img src="assets/bengaluru.jpg" />
//       <div class="tile-text text-center text-white">
//         <h5>Bengaluru</h5>
//         <p>100+ places</p>
//       </div>
//     </div>
//   </a>
// </div>
  let contain=document.createElement("div");
  contain.classList="col-12 col-sm-6 col-lg-3 mb-4";
  contain.innerHTML=`<a href="pages/adventures/?city=${id}" id=${id}>
        <div class="tile">
        <img src=${image} />
        <div class="tile-text text-center text-white">
        <h5>${city}</h5>
        <p>${description}</p>
       </div>
    </div>
  </a>`;

  let parent = document.getElementById("data");
  parent.append(contain);



}

export { init, fetchCities, addCityToDOM };
