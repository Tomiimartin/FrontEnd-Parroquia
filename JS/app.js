import { form, inputTel, inputSubject, inputTextArea, pageNew } from "./selectores.js";

import { validarForm, validarTel, validarAsunto, validarMensaje, llamadoNewsCMS, llamadoHourCMS, llamadoNew } from "./funciones.js";


// eventos
form?.addEventListener("submit", (e)=>{
    validarForm(e)
});

inputTel?.addEventListener("input", () => {
    validarTel(); 
});

inputSubject?.addEventListener("input", ()=>{ 
    validarAsunto()
})

inputTextArea?.addEventListener("input", ()=>{ 
    validarMensaje()
})

try {
    if(pageNew){
        await llamadoNew();
    }else{
        await Promise.all([llamadoNewsCMS(),llamadoHourCMS()]);
    }
} catch (error) {
    console.log(error);
}
