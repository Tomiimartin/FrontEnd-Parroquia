import { form, inputTel, inputName, inputEmail, inputSubject, inputTextArea, botonSubmit, loader } from "./selectores.js";
import { BACKEND_URL, STRAPI_URL } from "./urls.js";

export function validarTel() {
    if (inputTel.value.length < 10) {
        inputTel.setCustomValidity("Caracteres mínimos: 10");
        inputTel.reportValidity();
        return false;
    } else {
        inputTel.setCustomValidity("");
        inputTel.reportValidity();
        return true;
    }
}

export function validarAsunto() {
    if (inputSubject.value.length < 5) {
        inputSubject.setCustomValidity("Caracteres mínimos: 5");
        inputSubject.reportValidity();
        return false;
    } else {
        inputSubject.setCustomValidity("");
        inputSubject.reportValidity();
        return true;
    }
}

export function validarMensaje() {
    if (inputTextArea.value.length < 10) {
        inputTextArea.setCustomValidity("Caracteres mínimos: 10");
        inputTextArea.reportValidity();
        return false;
    } else {
        inputTextArea.setCustomValidity("");
        inputTextArea.reportValidity();
        return true;
    }
}

export async function validarForm(e) {
    e.preventDefault();
    botonSubmit.blur();

    // Validando length de asunto, tel y mensaje
    if (!validarTel() || !validarAsunto()) {
        return;
    }

    loader.classList.add("loader-visiibility");

    let data = {
        name: inputName.value,
        emailPerson: inputEmail.value,
        subject: inputSubject.value,
        phone: inputTel.value,
        message: inputTextArea.value,
    };

    try {
        const response = await fetch(`${BACKEND_URL}.netlify/functions/send-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setTimeout(() => {
            loader.classList.remove("loader-visiibility");
            alert(result.message);
            if (response.ok) {
                form.reset()
            }
        }, 3000);
    } catch (error) {
        console.error("Error en el envío del correo:", error);
        loader.classList.remove("loader-visiibility");
        alert("Hubo un error al enviar el correo. Revisa la consola para más detalles.");
    }
}

export async function llamadoNewsCMS() {
    const url = `${STRAPI_URL}news?fields[0]=fecha&fields[1]=informacion&fields[2]=titulo&fields[3]=documentId&populate[imagen][fields][0]=url&populate[imagen][fields][1]=name`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // verifico que este en la page index
        const index = document.querySelector(".container-box");
        if (!index) {
            crearNews(data.data)
        } else {
            crearNews(data.data.slice(-4))
        }
    } catch (error) {
        console.log(error);
    }
}

export async function llamadoHourCMS() {
    const url = `${STRAPI_URL}hours?fields[0]=info&fields[1]=tittle&populate[imagen][fields][0]=name&populate[imagen][fields][1]=url`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        crearCardHour(data.data)
    } catch (error) {
        console.log(error);
    }
}

export async function llamadoNew() {
    const params = new URLSearchParams(window.location.search);
    const Id = params.get("id");

    if (!Id) {
        return null
    }

    try {
        const response = await fetch(`${STRAPI_URL}news/${Id}?fields[0]=fecha&fields[1]=informacion&fields[2]=titulo&fields[3]=documentId&populate[imagen][fields][0]=url&populate[imagen][fields][1]=name`);
        const data = await response.json();
        crearNew(data.data)
    } catch (error) {
        console.log(error);
    }
}

function crearNews(array) {
    const contenedprNew = document.querySelector(".content-art__novedades");

    array.forEach(e => {
        const { fecha, documentId, imagen: { url, name }, informacion, titulo } = e;
        // creo la new
        let article = document.createElement("article");
        article.classList.add("art-novedades");

        let img = document.createElement("img");
        img.src = `${url}`;
        img.alt = `${name}`;
        img.loading = "eager"
        
        
        let div = document.createElement("div");
        div.classList.add("container-text");

        let pFecha = document.createElement("p");
        pFecha.classList.add("fecha");
        pFecha.textContent = `${fecha}`;

        let h3 = document.createElement("h3");
        h3.textContent = `${titulo}`

        let contenedorTop = document.createElement("div");
        contenedorTop.classList.add("contenedorTop")

        let pResumen = document.createElement("p");
        pResumen.classList.add("resumen");

        const render = new marked.Renderer();
        render.image = () => "";
        marked.setOptions({ render });

        pResumen.innerHTML = marked.parse(informacion);


        console.log(informacion);
        console.log(pResumen);
        
        

        let enlace = document.createElement("a");
        enlace.href = `new.html?id=${documentId}`;
        enlace.rel = "noopener noreferrer";
        enlace.classList.add("btn", "LeerMas");
        enlace.textContent = "Leer Mas";


        contenedorTop.appendChild(pFecha);
        contenedorTop.appendChild(h3);
        div.appendChild(contenedorTop);
        div.appendChild(pResumen);
        div.appendChild(enlace);
        article.appendChild(img);
        article.appendChild(div);
        contenedprNew?.appendChild(article);

    });

}

function crearCardHour(array) {
    const contenedorCards = document.querySelector(".content-art__horarios");
    array.forEach(e => {
        const { imagen: { name, url }, info, tittle } = e;

        // Crear el elemento article principal
        const article = document.createElement('article');
        article.className = 'art-card';

        // Crear la imagen
        const img = document.createElement('img');
        img.src = url;
        img.alt = name;

        // Crear el título
        const h3 = document.createElement('h3');
        h3.textContent = tittle;

        // Crear el párrafo
        const p = document.createElement('p');
        p.textContent = info;

        const div = document.createElement("div");
        div.classList.add("classDivHour");

        // Añadir todos los elementos al article
        div.appendChild(h3);
        div.appendChild(p);
        article.appendChild(img);
        article.appendChild(div);
        contenedorCards?.appendChild(article);
    });
}

function crearNew(data) {
    if (!data) {
        ErroNew();  
        return
    }

    const contenedor = document.querySelector(".section-new");

    const { imagen: { name, url, }, informacion, fecha, titulo } = data;
    
    const containerImgTop = document.createElement('div');
    containerImgTop.className = 'conteiner-imgTop';

    const img = document.createElement('img');
    img.src = url;
    img.alt = name;

    const fechaNew = document.createElement('p');
    fechaNew.className = 'fecha-new';
    fechaNew.textContent = fecha;

    const tituloNew = document.createElement('h1');
    tituloNew.className = 'titulo-new';
    tituloNew.textContent = titulo;

    const containerInformacion = document.createElement('div');
    containerInformacion.className = 'conteiner-informacion';

    const informacionNew = document.createElement('p');
    informacionNew.className = 'informacion-new';
    informacionNew.innerHTML = marked.parse(informacion);

    const button = document.createElement("a");
    button.classList.add("btn","VerMasN","btn-principal");
    button.href = "./noticias.html";
    button.textContent = "Ver mas Noticias";
    
    const button2 = document.createElement("a");
    button2.classList.add("btn","VerMasN","btn-principal");
    button2.href = "./index.html";
    button2.textContent = "Pagina Principal";

    const divB = document.createElement("div");
    divB.classList.add("classDivB");

    containerImgTop.appendChild(img);
    containerImgTop.appendChild(fechaNew);

    containerInformacion.appendChild(informacionNew);

    divB.appendChild(button);
    divB.appendChild(button2);

    contenedor.appendChild(containerImgTop);
    contenedor.appendChild(tituloNew);
    contenedor.appendChild(containerInformacion);
    contenedor.appendChild(divB);
    
}

function ErroNew() {
    const contenedor = document.querySelector(".section-new");

    const cont = document.createElement("div");
    cont.classList = "cont-msj-error"

    const titulo = document.createElement("h3");
    titulo.className = "titulo-construccion";
    titulo.textContent = "Noticia no encontrada en el servidor";

    const parrafo = document.createElement("p");
    parrafo.className = "texto-construccion";
    parrafo.textContent = "Disculpanos el inconveniente, vuelva a intentarlo mas tarde";

    const button = document.createElement("a");
    button.classList.add("btn","VerMasN","btn-principal");
    button.href = "./noticias.html";
    button.textContent = "Ver mas Noticias";

    cont.appendChild(titulo);
    cont.appendChild(parrafo);
    cont.appendChild(button)

    contenedor.classList.add("errorNew");
    contenedor.appendChild(cont);

}