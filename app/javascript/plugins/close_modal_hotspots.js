const closeModalHotspots = () => {
  $('#modalInstructions').on('shown.bs.modal', function (e) {
    $('#modalHotspot').modal('hide');
  })
}

export { closeModalHotspots };
