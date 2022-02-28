const searchPhone = () => {
  const serachField = document.getElementById("search-field");
  const searchText = serachField.value;
  serachField.value = "";
  document.getElementById("error-message").style.display = "none";
  if (searchText == "") {
    //   console.log(searchText);
    const noplayerFound = document.getElementById("no-phone-found");
    noplayerFound.innerText = `Please write something to display`;
    return true;
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(data.data));
    } catch (error) {
      console.log(error);
    }
  }
};
