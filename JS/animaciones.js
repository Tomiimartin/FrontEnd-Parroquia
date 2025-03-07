console.log("js conectado");

// Funcion para scroll del button arrow-down del hero
function scrollArrowDown() {
    const sectionNovedades = document.querySelector(".container-section__novedades");
    let largoNav = document.querySelector(".top--hero").offsetHeight;
    let disntacia = sectionNovedades.getBoundingClientRect().top - 36;
    disntacia -= largoNav; 
    window.scrollBy({
        top: disntacia, // Desplazarse 100px hacia abajo
        behavior: 'smooth' // Hacer que el desplazamiento sea suave
    });
}

// funcion para llevar el scroll hasta el inicio(se agrega al logo);
function scrollTop() {
    window.scrollTo({
        top: 0, // Desplazarse 100px hacia abajo
        behavior: 'smooth' // Hacer que el desplazamiento sea suave
    });
}

// funcion/animacion para box de donaciones
function activarInfo(obj) {
    let conteinersBoxs = document.querySelectorAll(".box");
    let conteinerInfo = obj.childNodes[3]; 
    let info = conteinerInfo.childNodes[1];
    let infos = document.querySelectorAll(".info-box");
    let arrow = conteinerInfo.previousElementSibling.childNodes[3];
    let containersInfo = document.querySelectorAll("#container-info");

    // si uno de los container-info esta visible y el container-info que clikeo no lo esta... oculto el que esta visible y muestro el clikeado
    containersInfo.forEach(div => {
        if (div.classList.contains("info-visibility") && !conteinerInfo.classList.contains("info-visibility")) {
            div.classList.remove("info-visibility");
            div.previousElementSibling.childNodes[3].classList.toggle("arrow-box__click");
        }
    });

    // si la info del box clikeado esta en none y otro esta en inline, al inline lo vuelvo none
    infos.forEach(i => {
        if (i.classList.contains("display-A") && !info.classList.contains("display-A")) {
            i.classList.remove("display-A");
        }
    })
    
    // alterno class al container-info y el tipo de display a la info
    conteinerInfo.classList.toggle("info-visibility");
    info.classList.toggle("display-A");
    
    // alterno class al arrow
    arrow.classList.toggle("arrow-box__click");

    // si uno de los boxs esta expandido y el que yo clikeo no... oculto el que esta expandido
    conteinersBoxs.forEach(box => {
        if (box.classList.contains("height-auto") && !obj.classList.contains("height-auto")) {
            box.classList.remove("height-auto")
        }
    });
    
    conteinersBoxs.forEach(box => {
        if (box.classList.contains("height-auto_mp") && !obj.classList.contains("height-auto_mp")) {
            console.log("llego aca");
            box.classList.remove("height-auto_mp")
        }
    });

    // alterno la class para dar animacion al heigth
    if (obj.classList.contains("mp")) {
        obj.classList.toggle("height-auto_mp")
    }else {
        obj.classList.toggle("height-auto");
    }
}

// Funcion que agrega una class cuando el elemento es visible (cards de la section contacto)
const observer = new IntersectionObserver(enlaces => {
    enlaces.forEach(enlaceVisto => {
        if (enlaceVisto.isIntersecting) {
            // Agrega class que da animacion
            enlaceVisto.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

// Selecciono todos los enlaces con la class .info_anim y llamo a la funcion observer
const link = document.querySelectorAll('.info-anim');
link.forEach(e => {
    observer.observe(e); // Iniciar la observación del enlace
})

function checkScreenSize(textoLogo) {
    if (window.innerWidth < 1280) {
        textoLogo.style.display = "none";
    } else {
        textoLogo.style.display = "block"; // O "flex" según tu diseño
    }
}

// Animacion para nav-scroll top
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.top--hero');
    const navNovedades = document.querySelector('.top-novedades');
    const textoLogo = nav.childNodes[1].childNodes[1].childNodes[3];
    const divScroll = nav.childNodes[1].childNodes[3];
    const img = nav.childNodes[1].childNodes[1].childNodes[1];
    const textScrollMobile = document.querySelector(".text-scroll__mobile");
    const textScrollMobileSmall = document.querySelector(".text-scroll__mobile-small");
    
    if (window.scrollY >= 50) {
        // agregar o eliminar propiedades al div conteiner del nav-scrol
        if (!nav.classList.contains("top-novedades")) {
            nav.classList.add('nav--scroll'); 
        }
        
        // elimar el texto del logo
        if (!textoLogo.classList.contains("text-logo-novedades")) {
            checkScreenSize(textoLogo);
        }
        
        // elimar el texto del logo
        divScroll.removeAttribute("style");
        
        // agregar funcion Onclick a img
        img.addEventListener("click", scrollTop);
        img.classList.add("pointer")
        
        // oculto o muestro el text del nav
        textScrollMobile?.classList.add("visible");
        textScrollMobileSmall?.classList.add("visible");
    } 
    else if (window.scrollY > 1) {
        if (navNovedades) {
            navNovedades.classList.add('nav--scroll');
        }
    } else {
        nav.classList.remove('nav--scroll');
        textoLogo.removeAttribute("style");
        if (!divScroll.classList.contains("info--novedades")) {
            divScroll.style.display = "none";
        }
        img.classList.remove("pointer")
        textScrollMobile?.classList.remove("visible");
        textScrollMobileSmall?.classList.remove("visible");
    }
});

window.addEventListener("resize", () => {
    const nav = document.querySelector(".top--hero");
    const textoLogo = nav.childNodes[1].childNodes[1].childNodes[3];

    // Solo actualiza el display del logo si ya está en modo "scroll"
    if (window.scrollY >= 300) {
        if (!textoLogo.classList.contains("text-logo-novedades")) {
            checkScreenSize(textoLogo);
        }       
    }
    quitarWidth();
});

// funcion para scroll en los enlaces de secciones del nav
function scrollSection(seccion, ajuste) {
    const posicionSeccion = seccion.offsetTop;
    const posicionAjustada = posicionSeccion - ajuste;
    window.scrollTo({
        top: posicionAjustada,
        behavior: "smooth"
    })
}

// escucho los eventos click de los enlaces del nav, nav-scroll y del footer para agregar funcion de scroll

/*                          Nav-hero */
document.getElementById("link-novedades")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-novedades")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-horarios")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-horarios")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-donaciones__small")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-donaciones")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-donaciones")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-donaciones")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);
});
document.getElementById("link-contacto")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-contacto")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
/*                         Nav-scroll */
document.getElementById("link-novedadesTop")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-novedades")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-horariosTop")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-horarios")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-donacionesTop")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-donaciones")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-donacionesTop__small")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-donaciones")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-contactoTop")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-contacto")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
/*                         Footer */
document.getElementById("link-novedadesFooter")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-novedades")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-horariosFooter")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-horarios")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-donacionesFooter")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-donaciones")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});
document.getElementById("link-contactoFooter")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-contacto")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);

});

function obtenerDistanciaDesdeTop(elemento) {
    let distancia = 0;
    while (elemento) {
        distancia += elemento.offsetTop; // Sumar la distancia del elemento
        elemento = elemento.offsetParent; // Subir al contenedor padre
    }
    return distancia;
}

// Animacion para dar display al SiderBar, al tocar el btn del top
const siderbar = document.querySelector(".siderBar");
const BTNsiderbarOpen = document.querySelector(".arrow-left");
const BTNsiderbarClose = document.querySelector(".arrow-siderBar-Close");

function displaySiderOpen() {
    BTNsiderbarOpen.classList.add("opacity-0");
    BTNsiderbarClose.classList.remove("opacity-0");
    siderbar.classList.add("width");    
}

function displaySiderClose() {
    BTNsiderbarClose.classList.add("opacity-0");
    siderbar.classList.remove("width");    
    setTimeout(() => {
        BTNsiderbarOpen.classList.remove("opacity-0");
    }, 200);
}

function quitarWidth() {
    const siderbar = document.querySelector(".siderBar");
    const arrow = document.querySelector(".arrow-left");
    if (window.innerWidth >= 780) {
        siderbar?.classList.remove("width"); 
        arrow?.classList.remove("opacity-0"); 
    };
}

siderbar?.addEventListener("click", (e=>{
    if(e.target.classList.contains("color-fondo")){
        displaySiderClose();
    };
}))

document.querySelector(".enlace-donar")?.addEventListener("click", e => {
    e.preventDefault()
    const alturaNav = document.querySelector(".top--hero").scrollHeight;
    let section = document.getElementById("section-donaciones")
    let marginTop = parseInt(window.getComputedStyle(section).marginTop);
    let ajuste = alturaNav + marginTop;
    scrollSection(section, ajuste);
});
