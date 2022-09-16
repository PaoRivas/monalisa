const addBtn  = document.getElementById("addProduct");
const descSelect  = document.getElementById("descripcion");
const codigoInput  = document.getElementById("codigo");
const precioInput  = document.getElementById("precio");
const nitInput  = document.getElementById("nit");
const userSelect  = document.getElementById("user");
const totalInput  = document.getElementById("total");
var total = 0
const recepcionForm = document.getElementById('recepcionForm');
const facturarBtn = document.getElementById('facturarBtn');

document.getElementById('date').valueAsDate = new Date();

const createFactura = async () =>{
  const formData = new FormData(recepcionForm);
  const response = await fetch('/productos/getproducts', {
    method: "POST",
    body: formData
  });
  const detalle = await response.json();
  //console.log(detalle.productos)

  const option = document.querySelector('#user');
  const opSelected = userSelect.querySelector(`[value="${option.value}"]`);
  const tipo = opSelected.getAttribute('data-tipo');
  const razon = option.getDisplayValue();
  formData.append('tipo', tipo);
  formData.append('razon', razon);
  // for (let producto of detalle.productos){
  //   formData.append('detalle', JSON.stringify(producto));
  // }
  formData.append('detalle', JSON.stringify(detalle.productos));
  console.log(JSON.parse(formData.get('detalle')))
  const data = await fetch('/recepcion/add', {
    method: "POST",
    body: formData
  });


  // const response = await data.json();
  //setTimeout(function () { location.reload() }, 2000);
  // if (response.ok) {
  //   location.reload()
  // } else if (response.error) {
  //   response.error
  // } 
}

facturarBtn.addEventListener("click", (e) => {
    e.preventDefault();
    createFactura();
})

function changeCodigoValue(data) {

  const opSelected = descSelect.querySelector(`[value="${data}"]`);
  codigoInput.value = opSelected.getAttribute('data-codigo');
  precioInput.value = opSelected.getAttribute('data-precio');
}

function changeDescValue(data) {

  const opSelected = descSelect.querySelector(`[data-codigo="${data}"]`);
  const valor = opSelected.getAttribute('value');
  document.querySelector('#descripcion').setValue(valor);
  precioInput.value = opSelected.getAttribute('data-precio');
}

function changeNitValue(data) {

  //const nit = elem.options[elem.selectedIndex];
  const opSelected = userSelect.querySelector(`[value="${data}"]`);
  nitInput.value = opSelected.getAttribute('data-nit');
}

function changeUserValue(data) {

  const opSelected = userSelect.querySelector(`[data-nit="${data}"]`);
  const valor = opSelected.getAttribute('value');
  document.querySelector('#user').setValue(valor);
  //console.log(valor)
}

function childrenRow() {

  const table = document.getElementById("tablaDetalle");
  const inputs = document.querySelectorAll('#codigo, #descripcion, #precio');
  // GET TOTAL NUMBER OF ROWS 
  var x =table.rows.length;
  //var id = "tbl"+x;
  var row = table.insertRow(x-1);
  //row.id=id;
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell5.style.visibility = 'hidden';
  cell5.style.display = 'none';
  //console.log(cell5);
  cell1.innerHTML = `<input type="text" name="codigo" class="form-control" readonly value='${inputs[0].value}'/>`;
  cell2.innerHTML = `<input type="text" name="descripcion" class="form-control" readonly value='${inputs[1].getDisplayValue()}'/>`;
  cell3.innerHTML = `<input type="text" name="precio" class="form-control" readonly value='${inputs[2].value}'/>`;
  cell4.innerHTML = '<i class="fa-solid fa-xmark my-2 iconDelete" id="deleteProduct"></i>'; 
  cell5.innerHTML = `<input type="text" name="id" class="form-control" readonly value='${inputs[1].value}'/>`;

  totalInput.value = parseInt(total) + parseInt(precio.value);
  total = parseInt( totalInput.value);
  //inputs[1].reset();
  inputs.forEach(input => {
    input.value = '';
  });
  //console.log(codigo, desc, precio)
  cell4.addEventListener("click", (e) => {
    if (e.target && e.target.matches("#deleteProduct")) {
      e.preventDefault();
      //console.log(cell)
      deleteRow(row);
    }
  });
}

function deleteRow(ele) {
  //ele.parentNode.parentNode.remove();
  const precioRow = ele.querySelector(`[name="precio"]`);
  totalInput.value = parseInt(totalInput.value) - parseInt(precioRow.value);
  total = parseInt( totalInput.value);
  ele.remove();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  childrenRow();
});

VirtualSelect.init({ 
  ele: '#user', 
  search: true,
  hideClearButton: true,
  searchPlaceholderText: 'Buscar...',
  noSearchResultsText: 'No se encontraron resultados',
});

VirtualSelect.init({ 
  ele: '#descripcion',
  search: true,
  hideClearButton: true,
  searchPlaceholderText: 'Buscar...',
  noSearchResultsText: 'No se encontraron resultados',
  //silentInitialValueSet: true,
  autoSelectFirstOption: false,
  selectedValue: 2,
});

//document.querySelector('#descripcion').setValue('');

document.querySelector('#user').addEventListener('change', (e) => {
    e.preventDefault();
    let dato = e.target.value;
    //console.log(e.target)
    changeNitValue(dato);
});

document.querySelector('#descripcion').addEventListener('change', (e) => {
  e.preventDefault();
  let dato = e.target.value;
  //console.log(e.target.getSelectedOptions().label)
  changeCodigoValue(dato);
});

codigoInput.addEventListener("change", (e) => {
  e.preventDefault();
  let dato = e.target.value;
  changeDescValue(dato);
});

nitInput.addEventListener("change", (e) => {
  e.preventDefault();
  let dato = e.target.value;
  changeUserValue(dato);
});

// function childrenRow(){
//   const inputs = document.querySelectorAll('#codigo, #descripcion, #precio');
//   var table = document.getElementById("tablaDetalle");
//   var rowCount = table.rows.length;
//   var cellCount = table.rows[0].cells.length; 
//   var row = table.insertRow(rowCount-1);
//   for(var i =0; i < cellCount; i++){
//     var cell = row.insertCell(i);
//     if(i < cellCount-1){
//         cell.innerHTML=`<input type="text" name="${inputs[i].id}" class="form-control" readonly value="${inputs[i].value}"/>`;
//     }else{
//         cell.innerHTML ='<i class="fa-solid fa-xmark my-2 iconDelete" id="deleteProduct"></i>';
//     }
//   }

//   totalInput.value = parseInt(total) + parseInt(precio.value);
//   total = parseInt(totalInput.value);

//   inputs.forEach(input => {
//     input.value = '';
//   });

//   //const deleteBtn = document.getElementById("deleteProduct");
//   cell.addEventListener("click", (e) => {
//     if (e.target && e.target.matches("#deleteProduct")) {
//       e.preventDefault();
//       console.log(row);
//       deleteRow(row);
//     }
//   });
// }