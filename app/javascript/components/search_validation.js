const searchValidation = () => {
  if(document.querySelector("#rides-search .search-form")){

    const searchIcon = "<i class='fas fa-search'></i>";
    const searchForm = document.querySelector("#rides-search .search-form");
    const searchBtn = document.querySelector("#rides-search .search-form .btn-secondary");

    searchForm.insertAdjacentHTML("beforeend", searchIcon);

    const searchIconValidation = document.querySelector(".fa-search");

    searchIconValidation.addEventListener("click", (event) => {
      searchBtn.click();
    })
  }
}

export { searchValidation };
