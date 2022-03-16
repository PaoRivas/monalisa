const formsection = document.getElementById("formSection");
const cardbody = document.getElementById("card-body");


const addSections = async (page) => {
    
    const data = await fetch(`${page}/add`, {
      method: "GET",
    });
    const response = await data.text();
    formsection.innerHTML = response;
  };
  
cardbody.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".addbtn")) {
    e.preventDefault();
    let data = e.target.getAttribute("data-name");
    addSections(data);
  }
});