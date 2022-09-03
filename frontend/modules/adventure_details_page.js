import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  const params = new URLSearchParams(search);
  
  return params.get('adventure');
  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventures = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let result = await adventures.json();
     
    return result;
  }catch(err) {
    // catches errors both in fetch and response.json
    
    return null;
  }
    


  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
   document.getElementById("adventure-name").innerHTML = adventure.name;
   document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
   adventure.images.forEach(element => {
     
    document.getElementById("photo-gallery").appendChild(document.createElement("div")).innerHTML=`<img src=${element} class="activity-card-image"/>`;

    
   });
   document.getElementById("adventure-content").innerHTML=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

   document.getElementById("photo-gallery").innerHTML=
   `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
   <div class="carousel-indicators">
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
   </div>
   
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div>`;


   let carouselcontainer = document.createElement("div");
   carouselcontainer.classList="carousel-inner";
   
    
   images.forEach(element => {

        
     let imagediv= document.createElement("div");
     imagediv.classList="carousel-item";
     imagediv.innerHTML=`<img src="${element}" class="activity-card-image" alt="...">`;
     carouselcontainer.appendChild(imagediv);
  
   });
  // console.log(carouselcontainer);
   document.getElementById("carouselExampleIndicators").appendChild(carouselcontainer);
   document.getElementsByClassName("carousel-item")[0].classList.add("active");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
    if(!adventure.available)
    {
      document.getElementById("reservation-panel-sold-out").style.display = "block";
      document.getElementById("reservation-panel-available").style.display = "none";
    }
    else
    {
      document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
      document.getElementById("reservation-panel-sold-out").style.display = "none";
      document.getElementById("reservation-panel-available").style.display = "block";
    }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
    document.getElementById("reservation-cost").innerHTML = adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    const form = document.getElementById("myForm");

    form.addEventListener("submit",async (e)=>
    {
      e.preventDefault();
      let url = config.backendEndpoint+"/reservations/new";

      let formelements = form.elements;
      
      let bodystring = JSON.stringify(
        {
          name:formelements["name"].value,
          date:formelements["date"].value,
          person:formelements["person"].value,
          adventure:adventure.id,
        }
         );

    try{
      let res = await fetch(url,
        {
          method:"POST",
          body:bodystring,
          headers:{"Content-Type":"application/json",}

        });

        if(res.ok)
        {
          alert("Success!");
          window.location.reload();
        }
        else{
          let data = await res.json();
          alert(`Failed - ${data.message}`);
        }
    }
    catch(err)
    {
      console.log(err);
      alert("Failed-fetch call resulted in error");
    }


    });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  { document.getElementById("reserved-banner").style.display = "block";
}
else
{
  document.getElementById("reserved-banner").style.display = "none";
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
