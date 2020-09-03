const dangerValidation = () => {
  document.querySelectorAll('input[name="danger[category]"]').forEach((input) => {
    input.addEventListener("change", (event) => {
      document.querySelector('#new_danger .btn-cyclee').click()
    })
  })
}

export { dangerValidation };
