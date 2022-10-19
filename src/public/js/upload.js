const formcase = document.getElementById("card-body");

formcase.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".upldbtn")) {
    e.preventDefault();
    let id = e.target.getAttribute("data-id");
    var frm = document.getElementById('uploadForm') || null;
    if(frm) {
      frm.action = frm.action+"/"+id;
    }
  }
});