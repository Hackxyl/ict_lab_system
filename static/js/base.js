/*==================================================
KIANGINI ICT CENTRE
GLOBAL JAVASCRIPT
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{


/*==================================================
AOS INITIALIZATION
==================================================*/

if(typeof AOS !== "undefined"){


    AOS.init({

        duration:700,

        once:true,

        easing:"ease-out",

        offset:80

    });


}





/*==================================================
MOBILE SIDE MENU
==================================================*/


const mobileBtn =
document.getElementById("mobileMenuBtn");


const mobileMenu =
document.getElementById("mobileMenu");



const body =
document.body;



/*
OPEN / CLOSE MENU
*/


function toggleMenu(){


    mobileMenu.classList.toggle(
        "active"
    );


    mobileBtn.classList.toggle(
        "active"
    );


    body.classList.toggle(
        "menu-open"
    );


    const expanded =
    mobileBtn.getAttribute(
        "aria-expanded"
    )
    === "true";



    mobileBtn.setAttribute(
        "aria-expanded",
        !expanded
    );


}



/*
BUTTON CLICK
*/


if(mobileBtn && mobileMenu){


mobileBtn.addEventListener(
"click",
(e)=>{


    e.stopPropagation();


    toggleMenu();


});


}





/*
CLOSE MENU FUNCTION
*/


function closeMenu(){


    if(!mobileMenu || !mobileBtn)
    return;



    mobileMenu.classList.remove(
        "active"
    );


    mobileBtn.classList.remove(
        "active"
    );


    body.classList.remove(
        "menu-open"
    );


    mobileBtn.setAttribute(
        "aria-expanded",
        "false"
    );


}





/*
CLOSE WHEN CLICK LINK
*/


if(mobileMenu){


mobileMenu
.querySelectorAll("a")
.forEach(link=>{


    link.addEventListener(
    "click",
    ()=>{


        closeMenu();


    });


});


}





/*
CLICK OUTSIDE MENU
*/


document.addEventListener(
"click",
(e)=>{


if(
mobileMenu &&
mobileMenu.classList.contains("active") &&
!mobileMenu.contains(e.target) &&
!mobileBtn.contains(e.target)

){


    closeMenu();


}


});







/*
ESCAPE CLOSE
*/


document.addEventListener(
"keydown",
(e)=>{


if(e.key==="Escape"){


    closeMenu();


}


});







/*
WINDOW RESIZE RESET
*/


window.addEventListener(
"resize",
()=>{


if(window.innerWidth > 992){


    closeMenu();


}


});









/*==================================================
STICKY HEADER
==================================================*/


const header =
document.getElementById("header");



if(header){


window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 50){


header.classList.add(
"scrolled"
);


}

else{


header.classList.remove(
"scrolled"
);


}


});


}









/*==================================================
FAQ ACCORDION
==================================================*/


const faqItems =
document.querySelectorAll(
".faq-item"
);



faqItems.forEach(item=>{


const question =
item.querySelector(
".faq-question"
);



if(question){



question.addEventListener(
"click",
()=>{


const active =
item.classList.contains(
"active"
);



faqItems.forEach(faq=>{


faq.classList.remove(
"active"
);


});



if(!active){


item.classList.add(
"active"
);


}


});


}



});









/*==================================================
SMOOTH SCROLL
==================================================*/


document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{


anchor.addEventListener(
"click",
function(e){



const target =
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:"smooth",

block:"start"

});


}



});


});









/*==================================================
BACK TO TOP
==================================================*/


const backToTop =
document.getElementById(
"backToTop"
);



if(backToTop){



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 400){


backToTop.classList.add(
"show"
);


}

else{


backToTop.classList.remove(
"show"
);


}



});




backToTop.addEventListener(
"click",
()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


});


}









/*==================================================
PAGE LOADER
==================================================*/


const loader =
document.getElementById(
"page-loader"
);



window.addEventListener(
"load",
()=>{


if(loader){


loader.classList.add(
"hide"
);



setTimeout(()=>{


loader.style.display="none";


},500);



}



if(typeof AOS !== "undefined"){


AOS.refresh();


}



});









/*==================================================
ACTIVE NAV LINK
==================================================*/


const currentPath =
window.location.pathname;



document
.querySelectorAll(
".nav-menu a"
)
.forEach(link=>{


const linkPath =
new URL(link.href)
.pathname;



if(
linkPath === currentPath
){


link.classList.add(
"active"
);


}



});









/*==================================================
IMAGE LAZY LOADING
==================================================*/


document
.querySelectorAll("img")
.forEach(img=>{


if(!img.hasAttribute("loading")){


img.setAttribute(
"loading",
"lazy"
);


}


});









/*==================================================
DISABLE EMPTY LINKS
==================================================*/


document
.querySelectorAll(
'a[href="#"]'
)
.forEach(link=>{


link.addEventListener(
"click",
e=>{


e.preventDefault();


});


});



});