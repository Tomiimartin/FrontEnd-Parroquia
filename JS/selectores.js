
// Selectores Formulario
const form = document.querySelector("form");

const inputEmail = form?.firstElementChild?.firstElementChild; 

const inputTel = form?.firstElementChild?.lastElementChild; 

const inputName = form?.childNodes[3]?.firstElementChild; 

const inputSubject = form?.childNodes[3]?.lastElementChild; 

const inputTextArea = form?.childNodes[5];

const botonSubmit = form?.lastElementChild;

const loader = document.querySelector(".loader");

const pageNew = document.querySelector(".pageNew");

export {
    form,
    inputEmail,
    inputTel, 
    inputName,
    inputSubject,
    inputTextArea,
    loader, 
    botonSubmit,
    pageNew
}