const initTimeOutFlashes = () => {

  const flashesElement = document.querySelector('.loading');
  if (flashesElement) {
  // console.log(homeElement.dataset)
      window.setTimeout(() => {
        window.location.href ;
      }, 3000);
  }
}

export { initTimeOutFlashes }
