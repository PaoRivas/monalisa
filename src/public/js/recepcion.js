window.addEventListener('load', async (event) => {
  //console.log('page is fully loaded', event);
  const response = await fetch('/facturas/datos', {
    method: "GET"
  });
  const datos = await response.json();

  const optionsNit = [];
  const optionsUser = [];
  const optionsActivity = [];
  
  for (let user of datos.users){
    var optionU = {label: user.razon_social, value: user.id};
    var optionN = {label: user.numero_documento, value: user.id};
    optionsUser.push(optionU);
    optionsNit.push(optionN);
    
  }

  for (let activity of datos.activities){
    var option = {label: activity.descripcion, value: activity.codigo_caeb}
    optionsActivity.push(option);
  }

  VirtualSelect.init({
    ele: '#selectNit',
    search: true,
    placeholder: 'NIT o CI del cliente',
    searchPlaceholderText: 'Buscar...',
    noOptionsText: 'No se encontraron resultados',
    noSearchResultsText: 'No se encontraron resultados',
    maxWidth: 'inherit',
    searchByStartsWith: true,
    markSearchResults: true,
    options: optionsNit,
  });

  VirtualSelect.init({
    ele: '#selectUser',
    search: true,
    placeholder: 'Seleccione un cliente',
    searchPlaceholderText: 'Buscar...',
    noOptionsText: 'No se encontraron resultados',
    noSearchResultsText: 'No se encontraron resultados',
    maxWidth: 'inherit',
    searchByStartsWith: true,
    markSearchResults: true,
    options: optionsUser,
  });

  VirtualSelect.init({
    ele: '#selectActivity',
    search: true,
    placeholder: 'Seleccione una actividad',
    searchPlaceholderText: 'Buscar...',
    noOptionsText: 'No se encontraron resultados',
    noSearchResultsText: 'No se encontraron resultados',
    maxWidth: 'inherit',
    hideClearButton: true,
    autoSelectFirstOption:true,
    options: optionsActivity,
  });

  VirtualSelect.init({
    ele: '#selectCode',
    search: true,
    placeholder: 'Código del producto',
    searchPlaceholderText: 'Buscar...',
    noOptionsText: 'No se encontraron resultados',
    noSearchResultsText: 'No se encontraron resultados',
    maxWidth: 'inherit',
  });

  VirtualSelect.init({
    ele: '#selectDescription',
    search: true,
    placeholder: 'Seleccione un producto',
    searchPlaceholderText: 'Buscar...',
    noOptionsText: 'No se encontraron resultados',
    noSearchResultsText: 'No se encontraron resultados',
    maxWidth: 'inherit',
  });

});

const recepcionForm = document.getElementById('recepcionForm');
const selectNit = document.querySelector('#selectNit')
const selectUser = document.querySelector('#selectUser')
const selectActivity = document.querySelector('#selectActivity')
const selectCode = document.querySelector('#selectCode')
const selectProduct = document.querySelector('#selectDescription')
const inputPrecio = document.querySelector('#precio')
const addBtn  = document.getElementById("addProduct");
const facturarBtn = document.getElementById('facturarBtn');
const inputTotal  = document.getElementById("total");
inputTotal.value = 0;
document.getElementById('date').valueAsDate = new Date();

selectNit.addEventListener('change', (e) => {
  e.preventDefault();
  //if (e.target === document.activeElement.parentElement){
    selectUser.setValue(e.target.value, true);
    //console.log(e.target.value);
  //}
});

selectUser.addEventListener('change', (e) => {
  e.preventDefault();
  //console.log(e.target.value);
  selectNit.setValue(e.target.value, true);
});

selectActivity.addEventListener('change', async (e) => {
  e.preventDefault();
  const id = e.target.value;
  const response = await fetch(`/facturas/productos/${id}`, {
    method: "GET"
  });
  const datos = await response.json();

  const optionsDescription = [];
  const optionsCode = [];

  for (let product of datos.products){
    var optionC = {label: product.codigo, value: product.id};
    var optionD = {label: product.descripcion, value: product.id, customData: product.precio};
    optionsCode.push(optionC);
    optionsDescription.push(optionD);
  }

  selectCode.setOptions(optionsCode, true);
  selectProduct.setOptions(optionsDescription, true);
  selectProduct.reset();
  //console.log(e.target.getDisplayValue());
});

selectCode.addEventListener('change', (e) => {
  e.preventDefault();
  //console.log(e.target.value);
  selectProduct.setValue(e.target.value, true);
  const option = selectProduct.getSelectedOptions();
  inputPrecio.value = option ? option.customData : '';
});

selectProduct.addEventListener('change', (e) => {
  e.preventDefault();
  //console.log(e.target.value);
  const option = selectProduct.getSelectedOptions();
  inputPrecio.value = option ? option.customData : '';
  selectCode.setValue(e.target.value, true);
});

function childrenRow() {

  console.log(selectCode.value, selectProduct.value)

  const table = document.getElementById("tablaDetalle");
  var row = table.insertRow(2);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell5.style.visibility = 'hidden';
  cell5.style.display = 'none';
  // //console.log(cell5);
  cell1.innerHTML = `<input type="text" class="form-control" readonly value='${selectCode.getDisplayValue()}'/>`;
  cell2.innerHTML = `<input type="text" class="form-control" readonly value='${selectProduct.getDisplayValue()}'/>`;
  cell3.innerHTML = `<input type="text" class="form-control data-precio" readonly value='${inputPrecio.value}'/>`;
  cell4.innerHTML = '<i class="fa-solid fa-xmark my-2 iconDelete" id="deleteProduct"></i>'; 
  cell5.innerHTML = `<input type="text" name="productsid" class="form-control" readonly value='${selectProduct.value}'/>`;

  inputTotal.value = parseInt(inputTotal.value) + parseInt(inputPrecio.value);
  selectProduct.reset();

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
  const precioRow = ele.querySelector('.data-precio');
  inputTotal.value = parseInt(inputTotal.value) - parseInt(precioRow.value);
  //total = parseInt( totalInput.value);
  ele.remove();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  childrenRow();
});

const createFactura = async () =>{
  const formData = new FormData(recepcionForm);
  const response = await fetch('/facturas/add', {
    method: "POST",
    body: formData
  });
  // const detalle = await response.json();
  // console.log();
}

facturarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createFactura();
})