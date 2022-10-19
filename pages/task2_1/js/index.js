'use strict'; 
let imgItem = document.querySelector('.content__img');
let imgItemChange = document.querySelector('.content__img-change');
let imgItems = document.querySelectorAll('.content__img');
let imgItemChanges = document.querySelectorAll('.content__img-change');
let priceSum = document.querySelector('.content__sum');
let priceText = [...document.querySelectorAll('.content__sum-text')];
let afterPrice = document.querySelector('.content__price-jetty');
let allAfterPrice = [...document.querySelectorAll('.content__price-jetty')];
let btns = [...document.querySelectorAll('.button')];
let items = [...document.querySelectorAll('.content__item')];
let itemDedcript = document.querySelector('.content__description');
let itemDedcripts = document.querySelectorAll('.content__description');
let sendTimeList = [...document.querySelectorAll('.send-item__time')];
let sendTimeItems = [...document.querySelectorAll('.send-item__time-item')];
let sendItemWidth = document.querySelector('.send-item__time-item').clientWidth;
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
let main = document.querySelector('.main');
let temp;
let doit;

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
    main.classList.toggle('main-shadow')
}


function resizedw(){
    let windowScreen = document.documentElement.clientWidth;
    items.forEach(e => {
        let eImg = e.firstElementChild,
            desItem = e.lastElementChild,
            imgSizeWidth = e.firstElementChild.firstElementChild,
            imgSizeHeight = e.firstElementChild.firstElementChild;
            eImg.style.opacity = '0';
            desItem.style.opacity = '0';
            eImg.style.transform = 'translateY(-120%)';
            if (windowScreen > 719){
                imgSizeWidth.setAttribute('width', '473')
                imgSizeHeight.setAttribute('height', '369');
            } else {
                imgSizeWidth.setAttribute('width', '341')
                imgSizeHeight.setAttribute('height', '220');
            }
            desItem.style.transform = 'translateY(120%)';
            if (windowScreen > 719){
                if (e.firstElementChild.className == 'content__img-change') {
                    e.firstElementChild.classList.toggle('content__img-change')
                    e.firstElementChild.classList.toggle('content__img-change--desktop')
                }
            } else {
                imgSizeWidth.setAttribute('width', '341')
                imgSizeHeight.setAttribute('height', '220');
                if (e.firstElementChild.className == 'content__img-change--desktop') {
                    e.firstElementChild.classList.toggle('content__img-change--desktop')
                    e.firstElementChild.classList.toggle('content__img-change')
                }
            }
        setTimeout(() => {
            eImg.style.opacity = '1';
            desItem.style.opacity = '1';
            eImg.style.transform = 'translateY(0%)';
            desItem.style.transform = 'translateY(0%)';
        }, 800)
    })
}

window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(resizedw, 1);
};

document.addEventListener('DOMContentLoaded', () => {
    function changeImgSize () {
        let windowScreen = document.documentElement.clientWidth;
        items.forEach(e => {
            let imgAfter = (e.firstElementChild.getAttribute('data-type'));
            if (imgAfter == null || imgAfter.length < 1) {
                e.firstElementChild.classList.toggle('no--after');
            }

            let contentList = e.lastElementChild.querySelector('.content__list');
            let sendItemList = contentList.lastElementChild
                               .firstElementChild.lastElementChild
                               .querySelectorAll('.send-item__time-item');
            if (sendItemList.length > 4) {
                contentList.lastElementChild.firstElementChild.lastElementChild.style.margin = "0";

                for (let i = 3; i < sendItemList.length; i++) {
                    if (i === 3) {
                        temp = sendItemList[i].innerHTML;
                        sendItemList[i].innerHTML = 'еще...';
                        sendItemList[i].classList.toggle('send-item__time--more');
                        continue;
                    } 
                    if (i > 3) {
                        sendItemList[i].classList.toggle('none-style');
                    }
                    if (i >= 4) {
                        contentList.lastElementChild
                        .firstElementChild.lastElementChild
                        .classList.add('send-item__time--wrap')
                        contentList.lastElementChild
                        .firstElementChild.classList.add('send-item--wrap')

                    }

                }
                    sendTimeList.forEach(e => {
                        if (e.className.match('send-item__time--wrap') !== null) {
                            e.style.maxWidth = `${(((sendItemWidth * 4) + (3 * 6)) * 2 )}px`;
                        }
                    });    

            }

            let imgSizeWidth = e.firstElementChild.firstElementChild,
                imgSizeHeight = e.firstElementChild.firstElementChild;
                if (windowScreen > 719){
                    imgSizeWidth.setAttribute('width', '473')
                    imgSizeHeight.setAttribute('height', '369');
                    if (e.firstElementChild.className == 'content__img-change') {
                        e.firstElementChild.classList.toggle('content__img-change')
                        e.firstElementChild.classList.toggle('content__img-change--desktop')
                    }
                } else {
                    imgSizeWidth.setAttribute('width', '341')
                    imgSizeHeight.setAttribute('height', '220');
                    if (e.firstElementChild.className == 'content__img-change--desktop') {
                        e.firstElementChild.classList.toggle('content__img-change--desktop')
                        e.firstElementChild.classList.toggle('content__img-change')
                    }
                }
        })
    }

    changeImgSize();
    function addPaddingPriceSum() {
        if (allAfterPrice[0]) {
            allAfterPrice.forEach(e => {
                let sum = e.parentNode.firstChild.nextElementSibling;
                return sum.style.margin = '0 0 5px 0';
            })
        } else {
            allAfterPrice.forEach(e => {
                let sum = e.parentNode.firstChild.nextElementSibling;
                return sum.style.margin = '0';
            })
        }
    }
    addPaddingPriceSum();

    function changeButtonStyle() {
        if (priceText[0]) {
            priceText.forEach((e, i) => {
                if (+e.innerHTML > 1000 ){
                    let currDesc = items[i].lastElementChild;
                    let currPrice = currDesc.lastElementChild;
                    let currBtnBlock = currPrice.lastElementChild;
                    let currButton = currBtnBlock.firstElementChild; 
                    let currImgBlock =  items[i].firstElementChild; 
                    
                    currButton.classList.toggle('stoke-price-button')
                    currImgBlock.classList.toggle('content__img');
                    currImgBlock.classList.toggle('content__img-change');

                }
            })
        }
    }

    changeButtonStyle();

    function changeAfterSize () {
        let windowScreen = document.documentElement.clientWidth;
        items.forEach(e => {
            let imgSizeWidth = e.firstElementChild.firstElementChild,
                imgSizeHeight = e.firstElementChild.firstElementChild;
                if (windowScreen > 719){
                    if (e.firstElementChild.className == 'content__img-change') {
                        e.firstElementChild.classList.toggle('content__img-change')
                        e.firstElementChild.classList.toggle('content__img-change--desktop')
                    }
                } else {
                    imgSizeWidth.setAttribute('width', '341')
                    imgSizeHeight.setAttribute('height', '220');
                    if (e.firstElementChild.className == 'content__img-change--desktop') {
                        e.firstElementChild.classList.toggle('content__img-change--desktop')
                        e.firstElementChild.classList.toggle('content__img-change')
                    }
                }
        })
    }

    changeAfterSize();

    let sendMoreList = document.querySelectorAll('.send-item__time--more');

    sendMoreList.forEach (e => {
        e.addEventListener('click', (event) => {
            let itemList = event.target.parentNode.querySelectorAll('.send-item__time-item');
            [...itemList].forEach((e, i, arr) => {
                if (e.className.match('send-item__time--more') !== null) {
                    e.innerHTML = temp;
                    e.classList.toggle('send-item__time--more');
                    let cloth = document.createElement("li");
                    cloth.classList.toggle('close--item');
                    let parent = event.target.parentNode;
                    parent.append(cloth);
                    cloth.innerHTML = 'скрыть';
                    event.target.parentNode.style.margin = '0 0 10px 0';
                    if (parent.lastElementChild.className.match('close--item') !== null) {
                        parent.lastElementChild.addEventListener('click', (event) => {
                            e.classList.toggle('send-item__time--more');
                            e.innerHTML = 'еще...';
                            for (let i = 3; i < [...itemList].length; i++) {
                                if (i > 3) {
                                    [...itemList][i].classList.toggle('none-style');
                                    parent.lastElementChild.remove(cloth);
                                }
                            }
                        });
                    };
                };
                if (e.className.match('none-style') !== null) {
                    e.classList.toggle('none-style');
                };
            });
  
            
        })

    })

})

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


// function resizeBurger(){
//     let windowScreen = document.documentElement.clientWidth;
//     if (windowScreen > 719) {

//     }
// }

// resizeBurger();
