'use strict';
let burger = document.querySelector('.burger');
let burgerLines = document.querySelectorAll('.burger__line');
let navLists = document.querySelector('.navigation__list');
let navItems = document.querySelectorAll('.navigation__item');
let navLinks = document.querySelectorAll('.navigation__link');
let navIt = document.querySelector('.navigation__item');
let navLi = document.querySelector('.navigation__link');
let navSubLists = document.querySelector('.navigation__sublist');
let navSubItems = document.querySelectorAll('.navigation__subitem');
let navSubLinks = document.querySelectorAll('.navigation__sublink');
let navSubItem = document.querySelector('.navigation__subitem');
let navSubLink = document.querySelector('.navigation__sublink');


function burgerToggle(){
    burger.classList.toggle('burger');
    burger.classList.toggle('burger-show');
    navLists.classList.toggle('navigation__list')
    navLists.classList.toggle('navigation__list--dropwdown')

    navItems.forEach(e => {
        e.classList.toggle('navigation__item')
        e.classList.toggle('navigation__item--dropwdown')
    })

    navLinks.forEach(e => {
        e.classList.toggle('navigation__link')
        e.classList.toggle('navigation__link--dropwdown')
    })

    navSubLists.classList.toggle('navigation__sublist')
    navSubLists.classList.toggle('navigation__sublist--dropwdown')

    navSubItems.forEach(e => {
        e.classList.toggle('navigation__subitem')
        e.classList.toggle('navigation__subitem--dropwdown')

    })

    navSubLinks.forEach(e => {
        e.classList.toggle('navigation__sublink')
        e.classList.toggle('navigation__sublink--dropwdown')
    
    })
    
    // main.classList.toggle('main')
    document.body.classList.toggle('body-shadow')
}

burger.addEventListener('click', (event) => {
    burgerToggle();
})

let check = function() {
    if (document.documentElement.clientWidth > 719 && burger.className.match('burger-show') !== null) {
        burger.click()
    }
}
document.querySelector('.main').addEventListener('click', () => {
    if (burger.className.match('burger-show') !== null) {
        burger.click()
    }
})
window.onresize = check;