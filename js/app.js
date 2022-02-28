const searchPhone = () => {
  const serachField = document.getElementById("search-field");
  const searchText = serachField.value;
  serachField.value = "";

  if (searchText == "") {
    console.log(searchText);
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}
  `;
    try {
      //   const response = fetch(url);
      //   const data = response.json();
      fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(data.data));
    } catch (error) {
      console.log(error);
    }
  }
};
