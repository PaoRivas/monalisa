const tbody = document.querySelector("tbody");
const formdiv = document.getElementById("formdiv");

const editUser = async (id) => {
    const data = await fetch(`user/edit/${id}`, {
      method: "GET",
    });
    const response = await data.text();
    formdiv.innerHTML = response;
};

const deleteUser = async (id) => {

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    const data = await fetch(`user/delete/${id}`, {
      method: "GET",
    });
    const response = await data.json();
    setTimeout(function () { location.reload() }, 3000);
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
    let id = e.target.getAttribute("id");
    editUser(id);
  }
});

tbody.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".btn-delete")) {
    e.preventDefault();
    let id = e.target.getAttribute("data-id");
    deleteUser(id);
  }
});