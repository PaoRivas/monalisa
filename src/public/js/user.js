const tbody = document.querySelector("tbody");
const formdiv = document.getElementById("formdiv");

const editUser = async (id) => {
    const data = await fetch(`user/edit/${id}`, {
      method: "GET",
    });
    const response = await data.text();
    formdiv.innerHTML = response;
};

tbody.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".editbtn")) {
      e.preventDefault();
      let id = e.target.getAttribute("id");
      editUser(id);
    }
  });