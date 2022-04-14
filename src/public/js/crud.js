const tbody = document.querySelector("tbody");
const formdiv = document.getElementById("editModalBody");

const editData = async (page, id) => {
    const data = await fetch(`/${page}/edit/${id}`, {
      method: "GET",
    });
    const response = await data.text();
    formdiv.innerHTML = response;
};

const deleteData = async (page, id) => {

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    const data = await fetch(`${page}/delete/${id}`, {
      method: "GET",
    });
    const response = await data.json();
    setTimeout(function () { location.reload() }, 2000);
    if (response.ok) {
      Swal.fire(
        'Deleted!',
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
  if (e.target && e.target.matches(".editbtn")) {
    e.preventDefault();
    let id = e.target.getAttribute("data-id");
    let data = e.target.getAttribute("data-name");
    editData(data, id);
  }
});

tbody.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".btn-delete")) {
    e.preventDefault();
    let id = e.target.getAttribute("data-id");
    let data = e.target.getAttribute("data-name");
    deleteData(data, id);
  }
});

// addModal.addEventListener('show.bs.modal', function (event) {
//   const button = event.relatedTarget
//   const recipient = button.getAttribute('data-bs')
//   const modalBodyInput = exampleModal.querySelector('.modal-hidden')

//   modalBodyInput.value = recipient
// })