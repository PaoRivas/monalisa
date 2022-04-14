const userForm = document.getElementById('userForm');
const addModaluser = new bootstrap.Modal(document.getElementById('addModaluser'))
const selectUser = document.getElementById('selectUser');

const createUser = async () =>{
  const formData = new FormData(userForm);
  const data = await fetch('/user/add', {
    method: "POST",
    body: formData
  });
  const response = await data.json();
  if (response.ok) {
    addModaluser.hide();
    let newOption = new Option(response.fullname, response.data);
    selectUser.add(newOption,undefined);
    selectUser.value = response.data
  } else if (response.error) {
    response.error
  } 
}

userForm.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".save-user")) {
    e.preventDefault();
    createUser();
  }
})