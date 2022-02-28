const searchPhone = () => {
  const serachField = document.getElementById("search-field");
  const searchText = serachField.value;
  serachField.value = "";
  document.getElementById("error-message").style.display = "none";
  if (searchText == "") {
    //   console.log(searchText);
    const noPhoneFound = document.getElementById("no-phone-found");
    noPhoneFound.innerText = `Please write something to display`;
    return true;
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => displaySearchPhoneResult(data.data));
    try {
      fetch(url)
        .then((response) => response.json())
        // .then((data) => console.log(data.data));
        .then((data) => displaySearchPhoneResult(data.data));
    } catch (error) {
      // console.log(error);
      const errorMessage = document.getElementById("error-message");
      errorMessage.innerText = `No phone results have been found!`;
    }
  }
};

//Display Phone Info Card
const displaySearchPhoneResult = (phones) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  document.getElementById("no-phone-found").style.display = "none";
  const errorMessage = document.getElementById("error-message");
  //checkif phone is found
  if (
    phones === null ||
    phones === undefined ||
    phones.length === 0 ||
    phones === "number"
  ) {
    // alert("No phone found");
    document.getElementById("error-message").style.display = "block";
    errorMessage.innerText = `No phone results have been found!`;
    console.log(errorMessage);
    return true;
  }
  // console.log(phones.slice(0, 20));

  //phone found
  phones.slice(0, 20).forEach((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.style.fontSize = "16px";
    div.innerHTML = `
       <div class="card h-100 shadow rounded-3">
          <img src="${phone.image}" class="card-img-top mt-3 p-3 w-50 mx-auto" alt="${phone.phone_name}">
          <div class="card-body">
              <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
              <p class="card-text"><span class="fw-bold"> Brand Name: </span>${phone.brand}</p>
              <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-lg rounded btn-info text-white fw-bold">Details</button>
          </div>
       </div>`;
    searchResult.appendChild(div);
  });
};

//Phone Details Load
const loadPhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhoneDetails(data.data));
};

//Display Phone Details Card
const displayPhoneDetails = (phoneDetails) => {
  const phoneDetailsDiv = document.getElementById("phone-details");
  phoneDetailsDiv.innerHTML = `
  <div class="card h-100 shadow rounded-3">
      <img src="${phoneDetails.image}" class="card-img-top mt-3 p-3 w-50 mx-auto" alt="${phoneDetails.name}">
      <div class="card-body">
          <h5 class="card-title">Phone Name: ${phoneDetails.name}</h5>
          <p class="card-text"><span class="fw-bold"> Release Date: </span>${phoneDetails.releaseDate}</p>
          <p class="card-text">Main Features</p><hr>
         
          <p class="card-text"><span class="fw-bold"> Storage: </span>${phoneDetails.mainFeatures.storage}</p>
          <p class="card-text"><span class="fw-bold"> Display Size: </span>${phoneDetails.mainFeatures.displaySize}</p>
          <p class="card-text"><span class="fw-bold"> Chip Set: </span>${phoneDetails.mainFeatures.chipSet}</p>
          <p class="card-text"><span class="fw-bold"> Memory: </span>${phoneDetails.mainFeatures.memory}</p>
          <p class="card-text"><span class="fw-bold"> Sensors: </span>${phoneDetails.mainFeatures.sensors[0]}, ${phoneDetails.mainFeatures.sensors[1]}, ${phoneDetails.mainFeatures.sensors[2]}, ${phoneDetails.mainFeatures.sensors[3]},${phoneDetails.mainFeatures.sensors[4]}, ${phoneDetails.mainFeatures.sensors[5]}</p>
          <p class="card-text">Others</p><hr>
          <p class="card-text"><span class="fw-bold"> WLAN: </span>${phoneDetails.others.WLAN}</p>
          <p class="card-text"><span class="fw-bold"> Bluetooth: </span>${phoneDetails.others.Bluetooth}</p>
          <p class="card-text"><span class="fw-bold"> GPS: </span>${phoneDetails.others.GPS}</p>
          <p class="card-text"><span class="fw-bold"> NFC: </span>${phoneDetails.others.NFC}</p>
          <p class="card-text"><span class="fw-bold"> Radio: </span>${phoneDetails.others.Radio}</p>
          <p class="card-text"><span class="fw-bold"> USB: </span>${phoneDetails.others.USB}</p>
          </div>`;
};
