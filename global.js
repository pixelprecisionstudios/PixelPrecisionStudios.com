//BURGER MENU

const burger = document.querySelector(".burger");
const navContents = document.querySelector(".navbar-contents");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navContents.classList.toggle("active");
})

document.querySelectorAll(".navbar-a").forEach(n => n.addEventListener("click", () =>{
    burger.classList.remove("active");
    navContents.classList.remove("active");
}))


//STICKY NAV
var scrollPosition = window.scrollY;
let navContainer = document.querySelector(".header-wrapper");
let navHeight = navContainer.offsetHeight;

window.addEventListener("scroll", () => {

    scrollPosition = window.scrollY;

    if (scrollPosition >= 48){
        navContainer.classList.add("header-sticky");
    }else{
        navContainer.classList.remove("header-sticky");
    }
})

//TEXT SCROLLER REPEAT

var scrollerCopy = document.querySelector(".text-scroller-animate").cloneNode(true);
document.querySelector(".text-scroller-wrapper").appendChild(scrollerCopy);