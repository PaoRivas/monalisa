const userForm = document.getElementById('userForm');

const createUser = async () =>{
  const formData = new FormData(userForm);
  const data = await fetch('/user/add', {
    method: "POST",
    body: formData
  });
  const response = await data.json();
  //setTimeout(function () { location.reload() }, 2000);
  if (response.ok) {
    location.reload()
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