const searchPhone = () => {
  spinner("block");
  const serachField = document.getElementById("search-field");
  const searchText = serachField.value;
  serachField.value = "";
  document.getElementById("error-message").style.display = "none";
  const noPhoneFound = document.getElementById("no-phone-found");
  if (searchText === "") {
    setTimeout(() => {
      spinner("none");
      noPhoneFound.innerText = `Please write something to display`;
      noPhoneFound.style.display = "block";
    }, 2000);
    document.getElementById("phone-container").innerHTML = "";
    return true;
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => getAllPhoneResult(data.data));
    } catch (error) {
      const errorMessage = document.getElementById("error-message");
      errorMessage.innerText = `No phone results have been found!`;
      document.getElementById("phone-container").innerHTML = "";
      return true;
    }
  }
  // spinner("none");
};

const getAllPhoneResult = (data) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  const showMoreButton = document.getElementById("button-show-more");
  const getDataLength = displaySearchPhoneResult(
    data.slice(0, 20),
    searchResult
  );
  // console.log(getDataLength);
  if (getDataLength >= 20) {
    showMoreButton.style.display = "block";
    showMoreButton.addEventListener("click", () => {
      displaySearchPhoneResult(data, searchResult);
      showMoreButton.style.display = "none";
    });
  } else {
    console.log("No more data");
  }
};

//Display Phone Info Card
const displaySearchPhoneResult = (phones, searchResult) => {
  spinner("block");
  // const searchResult = document.getElementById("search-result");
  // searchResult.textContent = "";
  document.getElementById("no-phone-found").style.display = "none";
  document.getElementById("phone-details").style.display = "none";
  const errorMessage = document.getElementById("error-message");
  //checkif phone is found
  if (phones === null || phones === undefined || phones.length === 0) {
    spinner("block");
    setTimeout(() => {
      spinner("none");
      errorMessage.innerText = `No phone results have been found!`;
      errorMessage.style.display = "block";
    }, 1500);
    document.getElementById("phone-container").innerHTML = "";
    return true;
  }
  // console.log(phones.slice(0, 20));
  // console.log(phones.length);
  setTimeout(() => {
    spinner("none");
    phones?.forEach((phone) => {
      console.log(phone);
      // console.log(phone.length);
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
       </div> `;
      searchResult.appendChild(div);
    });
  }, 1500);
  //phone found
  /* if (phones.length > 0) {
    console.log(phones.length);
    setTimeout(() => {
      spinner("none");
      phones?.forEach((phone) => {
        console.log(phone);
        // console.log(phone.length);
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
         </div> `;
        searchResult.appendChild(div);
      });
    }, 1500); */

  /* setTimeout(() => {
      spinner("none");
      const showMoreSearchResult = document.getElementById(
        "show-more-search-result"
      );
      const showMoreDiv = document.createElement("div");
      // showMoreDiv.classList.add("col");
      showMoreDiv.style.fontSize = "16px";
      showMoreDiv.innerHTML = `
      <div class="mt-3"><button class="btn btn-outline-info fs-4 fw-bolder" type="button" id="button-show-more">Show
      More</button>
      </div>
      `;
      showMoreSearchResult.appendChild(showMoreDiv);
    }, 1500); */
  spinner("none");
  length = phones.length;
  return length;
};

/* //Show More Phone Info Card
const showMorePhoneInfo = () => {
  // console.log("show more");
  displaySearchPhoneResult();
}; */

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
  document.getElementById("phone-details").style.display = "block";
  // phoneDetailsDiv.textContent = "";
  phoneDetailsDiv.innerHTML = `
  <div class="card h-100 shadow rounded-3">
      <img src="${
        phoneDetails.image
      }" class="card-img-top mt-3 p-3 w-50 mx-auto" alt="${phoneDetails.name}">
      <div class="card-body">
          <h5 class="card-title">Phone Name: ${phoneDetails.name}</h5>
          <p class="card-text"><span class="fw-bold"> Release Date: </span>
          ${
            phoneDetails.releaseDate
              ? phoneDetails.releaseDate
              : "Coming Soon..."
          }</p>
          <p class="card-text fw-bold">Main Features</p><hr>
          <p class="card-text"><span class="fw-bold"> Storage: </span>${
            phoneDetails.mainFeatures.storage
          }</p>
          <p class="card-text"><span class="fw-bold"> Display Size: </span>${
            phoneDetails.mainFeatures.displaySize
          }</p>
          <p class="card-text"><span class="fw-bold"> Chip Set: </span>${
            phoneDetails.mainFeatures.chipSet
          }</p>
          <p class="card-text"><span class="fw-bold"> Memory: </span>${
            phoneDetails.mainFeatures.memory
          }</p>
          <p class="card-text"><span class="fw-bold"> Sensors: </span>
          ${
            phoneDetails.mainFeatures?.sensors[0]
              ? phoneDetails.mainFeatures?.sensors[0]
              : "No Sensor"
          },   
          ${
            phoneDetails.mainFeatures?.sensors[1]
              ? phoneDetails.mainFeatures?.sensors[1]
              : "No Sensor"
          },
          ${
            phoneDetails.mainFeatures?.sensors[2]
              ? phoneDetails.mainFeatures?.sensors[2]
              : "No Sensor"
          },
          ${
            phoneDetails.mainFeatures?.sensors[3]
              ? phoneDetails.mainFeatures?.sensors[3]
              : "No Sensor"
          },
          ${
            phoneDetails.mainFeatures?.sensors[4]
              ? phoneDetails.mainFeatures?.sensors[4]
              : "No Sensor"
          },
          ${
            phoneDetails.mainFeatures?.sensors[5]
              ? phoneDetails.mainFeatures?.sensors[5]
              : "No Sensor"
          }
          </p>
          <p class="card-text fw-bold">Others</p><hr>
          <p class="card-text"><span class="fw-bold"> WLAN: </span>${
            phoneDetails.others?.WLAN
              ? phoneDetails.others?.WLAN
              : "Not Available"
          }</p>
          <p class="card-text"><span class="fw-bold"> Bluetooth: </span>${
            phoneDetails.others?.Bluetooth
              ? phoneDetails.others?.Bluetooth
              : "Not Available"
          }</p>
          <p class="card-text"><span class="fw-bold"> GPS: </span>${
            phoneDetails.others?.GPS
              ? phoneDetails.others?.GPS
              : "Not Available"
          }
          </p>
          <p class="card-text"><span class="fw-bold"> NFC: </span>${
            phoneDetails.others?.NFC
              ? phoneDetails.others?.NFC
              : "Not Available"
          }
          </p>
          <p class="card-text"><span class="fw-bold"> Radio: </span>${
            phoneDetails.others?.Radio
              ? phoneDetails.others?.Radio
              : "Not Available"
          }
         </p>
          <p class="card-text"><span class="fw-bold"> USB: </span>${
            phoneDetails.others?.USB
              ? phoneDetails.others?.USB
              : "Not Available"
          }
          </p>
          </div>`;
  /* if (phoneDetails === 1) {
    document.getElementById("phone-details").innerHTML = "";
    return true;
  } */
};

const spinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
