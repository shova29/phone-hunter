//loading data from API
const getUrl = (text) => {
  fetch("https://openapi.programming-hero.com/api/phones?search=" + text)
    .then((response) => response.json())
    .then((data) => getAllPhoneResult(data.data));
};
//check if element exists or not
const searchPhone = () => {
  spinner("block");
  showMore("none");
  showLess("none");
  const serachField = getElementById("search-field");
  const searchText = serachField.value;
  serachField.value = "";
  if (searchText == "") {
    setTimeout(() => {
      spinner("none");
      getElementById(
        "no-phone-found"
      ).innerText = `Please write something to display`;
    }, 1000);
    getElementById("phone-details").innerHTML = ``;
    getElementById("search-result").innerHTML = ``;
  } else {
    getElementById("phone-details").innerHTML = ``;
    getUrl(searchText);
  }
};
//get all phones details
const getAllPhoneResult = (data) => {
  const searchResult = getElementById("search-result");
  searchResult.textContent = "";
  const showMoreButton = getElementById("button-show-more");
  const showLessButton = getElementById("button-show-less");
  const getDataLength = displaySearchPhoneResult(
    data.slice(0, 20),
    searchResult
  );
  //20 phones are displayed
  if (getDataLength >= 20) {
    spinner("none");
    showMore("block");
    getElementById("no-phone-found").innerText = ``;
    showMoreButton.addEventListener("click", () => {
      searchResult.innerHTML = "";
      displaySearchPhoneResult(data, searchResult);
      showMore("none");
      showLess("block");
    });
    showLessButton.addEventListener("click", () => {
      window.scroll({
        top: 300,
        left: 500,
        behavior: "smooth",
      });
      searchResult.innerHTML = "";
      displaySearchPhoneResult(data.slice(0, 20), searchResult);
      showMore("block");
      showLess("none");
    });
  }
  //when no phones are found
  else if (getDataLength === 0) {
    spinner("none");
    getElementById(
      "no-phone-found"
    ).innerText = `No phone results have been found!`;
    showMore("none");
    getElementById("phone-details").innerHTML = ``;
    getElementById("search-result").innerHTML = ``;
  } else {
    spinner("none");
    showMore("none");
    showLess("none");
  }
};
//Display Phone Info Card
const displaySearchPhoneResult = (phones, searchResult) => {
  //phone found
  spinner("none");
  phones?.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.style.fontSize = "16px";
    div.innerHTML = `
       <div class="card text-center h-100 shadow rounded-3">
          <img src="${
            phone.image
          }" class="card-img-top mt-3 p-3 w-50 mx-auto" alt="${
      phone.phone_name
    }">
          <div class="card-body">
              <h4 class="card-title mb-1">${
                phone.phone_name ? phone.phone_name : "N/A"
              }</h4>
              <p class="card-text fs-5 mt-2"><span class="fw-bold">Brand: </span><span class="text-info fw-bolder">${
                phone.brand ? phone.brand : "N/A"
              }</span></p>
              <button onclick="loadPhoneDetails('${
                phone.slug ? phone.slug : "N/A"
              }')" class="btn btn-lg rounded-3 btn-info text-white fw-bold">Details</button>
          </div>
       </div> `;
    searchResult.appendChild(div);
  });

  spinner("none");
  const length = phones.length;
  return length;
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
  window.scroll({
    top: 300,
    left: 500,
    behavior: "smooth",
  });
  const phoneDetailsDiv = getElementById("phone-details");
  phoneDetailsDiv.style.display = "block";
  const [
    sensorOne,
    sensorTwo,
    sensorThree,
    sensorFour,
    sensorFive,
    sensorSix,
    ...sensorRest
  ] = phoneDetails.mainFeatures?.sensors;
  phoneDetailsDiv.innerHTML = `
    <div class="card h-100 shadow rounded-3">
        <img src="${
          phoneDetails.image ? phoneDetails.image : "./images/no-image.png"
        }" class="card-img-top mt-3 p-3 w-50 mx-auto" alt="${
    phoneDetails.name
  }">
        <div class="card-body">
            <h4 class="card-title fw-bold mb-3">${
              phoneDetails.name ? phoneDetails.name : "N/A"
            }</h4>
            <p class="card-text fs-5 mt-2 fw-bold"> <span> Brand: ${
              phoneDetails.brand ? phoneDetails.brand : "N/A"
            }</span></p>
            <p class="card-text fw-bold"><span class="text-black fs-5">${
              phoneDetails.releaseDate
                ? phoneDetails.releaseDate
                : "Coming Soon..."
            } </span>
            </p>
            <p class="card-text fw-bold mt-4 fs-5">Main Features</p> <hr class="border border-dark">
            <p class="card-text "><span class="fw-bold"> Storage: </span>${
              phoneDetails.mainFeatures?.storage
                ? phoneDetails.mainFeatures?.storage
                : "Not found"
            }</p>
            <p class="card-text"><span class="fw-bold"> Display Size: </span>${
              phoneDetails.mainFeatures?.displaySize
                ? phoneDetails.mainFeatures?.displaySize
                : "Not found"
            }</p>
            <p class="card-text"><span class="fw-bold"> Chip Set: </span>${
              phoneDetails.mainFeatures?.chipSet
                ? phoneDetails.mainFeatures?.chipSet
                : "Not found"
            }</p>
            <p class="card-text"><span class="fw-bold"> Memory: </span>${
              phoneDetails.mainFeatures?.memory
                ? phoneDetails.mainFeatures?.memory
                : "Not found"
            }</p>
            <p class="card-text"><span class="fw-bold"> Sensors: </span>
            ${sensorOne ? sensorOne : " - "} , 
            ${sensorTwo ? sensorTwo : " - "} , 
            ${sensorThree ? sensorThree : " - "} , 
            ${sensorFour ? sensorFour : " - "} , 
            ${sensorFive ? sensorFive : " - "} , 
            ${sensorSix ? sensorSix : " - "} ,  
            ${sensorRest ? sensorRest : " - "}
            </p>
            <p class="card-text fw-bold mt-4 fs-5">Others</p><hr class="border border-dark">
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
            }</p>
            <p class="card-text"><span class="fw-bold"> USB: </span>${
              phoneDetails.others?.USB
                ? phoneDetails.others?.USB
                : "Not Available"
            }</p>
            </div>`;
};
//spinner
const spinner = (displayStyle) => {
  return (getElementById("spinner").style.display = displayStyle);
};
//show more button
const showMore = (displayStyle) => {
  return (getElementById("button-show-more").style.display = displayStyle);
};
//show less button
const showLess = (displayStyle) => {
  return (getElementById("button-show-less").style.display = displayStyle);
};
//getelementbyid
const getElementById = (id) => {
  return document.getElementById(id);
};
