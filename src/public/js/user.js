const tbody = document.querySelector("tbody");
const formdiv = document.getElementById("formdiv");

const editData = async (page, id) => {
    const data = await fetch(`${page}/edit/${id}`, {
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
    await fetch(`${page}/delete/${id}`, {
      method: "GET",
    });
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
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