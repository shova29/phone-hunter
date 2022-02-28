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

  //phone found
  phones.forEach((phone) => {
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
                <button class="btn btn-lg rounded btn-info text-white fw-bold">Details</button>
            </div>
         </div>`;
    searchResult.appendChild(div);
  });
};
