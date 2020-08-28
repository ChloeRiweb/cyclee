const initTimeOutHome = () => {

  const homeElement = document.querySelector('.loading');
  if (homeElement) {
  // console.log(homeElement.dataset)
      window.setTimeout(() => {
        window.location.href = "/search";
      }, 3000);
  }
}

export { initTimeOutHome }
