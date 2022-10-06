const tbody = document.querySelector("tbody");

const anularFactura = async (id) => {
  const data = await fetch(`/facturas/anular/${id}`, {
    method: "GET",
  });
  const response = await data.text();
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    html: response,
    text: "No podrás revertir la acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, estoy seguro!',
    cancelButtonText: 'Cancelar'
  });
  
  if (result.isConfirmed) {
    const codigo = document.querySelector("#codigoMotivo").value;
    const formData = new FormData();
    formData.append('codigoMotivo', codigo.toString());
    const data = await fetch(`facturas/anular/${id}`, {
      method: "POST",
      body: formData
    });

    const response = await data.json();
    //setTimeout(function () { location.reload() }, 1500);
    if (response.ok) {
      Swal.fire(
        'Anulado!',
        response.ok,
        'success'
      )
    } else if (response.error) {
      Swal.fire(
        'Error!',
        response.error,
        'error'
      )
    }  
  }
};

tbody.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".anularbtn")) {
    e.preventDefault();
    let id = e.target.getAttribute("data-id");
    anularFactura(id);
  }
});