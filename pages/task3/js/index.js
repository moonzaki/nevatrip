'use strict';
let ticketCollection;

if (localStorage.getItem('tickets')) {
    ticketCollection = JSON.parse(localStorage.getItem('tickets'));
} else {
    ticketCollection = {}
}

document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('tickets') !== null) {
        relink(JSON.parse(localStorage.getItem('tickets')));
    }
});

let ticketTitle = [...document.querySelectorAll('.development__title')]
                  .map(e => e.innerHTML);
let ticketId = Array.from(Array([...document.querySelectorAll('.development__item')].length).keys())
               .map(e => e + 1);
let eventId = ticketId.map(e => '00' + e);
let eventDate = document.querySelectorAll('.development__date');
let ticketTypes = document.querySelectorAll('.types');
let ticketVarTypes = document.querySelectorAll('.development__type');
let quantityAll = document.querySelectorAll('.quantity-all');
let barcode =  document.querySelectorAll('.development__barcode');
let price = document.querySelectorAll('.price');
let userId = ['004', '0064', '00356'];
let countTbc;

if (localStorage.getItem('barcodeCounter')) {
    countTbc = JSON.parse(localStorage.getItem('barcodeCounter'));
} else {
    countTbc = 0;
}

let ticketAdultPrice = [...document.querySelectorAll('.adult-price')]
                       .map(e => +e.firstElementChild.innerHTML);

let ticketKidPrice = [...document.querySelectorAll('.kid-price')]
                       .map(e => +e.firstElementChild.innerHTML);

let ticketAdultQuantity = [...document.querySelectorAll('.adult-quantity')]
                          .map(e => +e.firstElementChild.innerHTML);

let ticketKidQuantity = [...document.querySelectorAll('.kid-quantity')]
                        .map(e => +e.firstElementChild.innerHTML);


let equalPrice = ticketAdultPrice.map((a, b) => a * ticketAdultQuantity[b])
                 .map((a, b) => a + ticketKidPrice.map((a, b) => a * ticketKidQuantity[b])[b]);


let ticketDataName = [
        'id',
        'user_id', 
        'event_id', 
        'event_date',
        'barcode', 
        'type', 
        'quantity',
        'price',
        'ticket_barcode',
        'sum',
        'create_date'
    ];

let typeTicket = document.querySelectorAll('.development__type');
let ticketPrice = [...document.querySelectorAll('.type-ticket-price')];
let orderBtns = [...document.querySelectorAll('.development__button')];
let devType = [...document.querySelectorAll('.development__type')];
let quantityBtns = [...document.querySelectorAll('.plus'), ...document.querySelectorAll('.minus')];
let clearLocalStorageBtn = document.querySelector('.clear-ls'); 

let typeTicketObject = {
    adults : 'Взрослый',
    kids : 'Детский', 
    notSpecified : 'Не указан',
    benefit : 'Льготный',
    group : 'Групповой'
};

let priceOfTypeTicket = {
    notSpecified : 0,
    benefit : 350,
    group : 2000,
    adult1 : 700,
    adult2 : 2300,
    adult3 : 1300,
    kid1 : 400,
    kid2 : 600, 
    kid3 : 800 
}


let adults, kids, notSpecified, benefit, group;
({adults, kids, notSpecified, benefit, group} = typeTicketObject);

function checkStr (value) {
    if (parseInt(value) || value.length > 20) {
        let str = false;
        return str;
    }
    let str =  value.trim();
    if (str !== '' ||  typeof str !== 'string') {
        return str;
    } else {
        str = false
        return str;
    }
}

let tableBlock = document.querySelector('.table-content');
let table = document.createElement('table');
let countOrder;

if (localStorage.getItem('orders')) {
    countOrder = JSON.parse(localStorage.getItem('orders'));
} else {
    countOrder = 1;
}

function genTicketBarcode(data){
    let ticketBc = [];
    let quantityLength = [...data].reduce((a, b) => +a + (+b));

    for(let i = 0; i < quantityLength; i++) {
        let tbc = '';
        countTbc++;
        tbc += `${'0'.repeat( 8 - `${countTbc}`.length)}${countTbc}`;
        ticketBc.push(tbc);
    }

    return ticketBc;
}


let underCouurentCount;

quantityBtns.forEach(e => {
    let currentCount = 0;
    e.addEventListener('click', (event) => {
        function makeCouner () {
            return function (plus, minus, quantityTarget){ 
                if (plus && quantityTarget.innerHTML >= 0) { 
                    currentCount++
                    underCouurentCount = currentCount
                    quantityTarget.innerHTML = currentCount; 
                    return currentCount;
                } else if (quantityTarget.innerHTML > 0 && minus){ 
                    currentCount = underCouurentCount = +quantityTarget.innerHTML;
                    underCouurentCount--;
                    if (underCouurentCount == -1) {
                        underCouurentCount = +quantityTarget.innerHTML;
                    }
                    quantityTarget.innerHTML = underCouurentCount; 
                    return currentCount;
                } 
            }
        }
        
        let currMake = makeCouner();
        let target = event.target;
        let root = target.parentNode.parentNode.parentNode.parentNode;
        let sumPrice = root.querySelector('.development__equal').firstElementChild;
        let currAdultPrice = root.querySelector('.adult-pblock').firstElementChild.
                             firstElementChild;
        let currKidPrice = root.querySelector('.kid-pblock').firstElementChild
                           .firstElementChild;
        let currTypePrice = root.querySelector('.type-tprice').firstElementChild
                            .firstElementChild;
        let quantityTarget = target.parentNode.firstElementChild;
        let plus = target.classList.contains('plus');
        let minus = target.classList.contains('minus');
        let itemArray = [...document.querySelectorAll('.development__item')];
        let includeItem = itemArray.indexOf(root) + 1;
        let currenTarget = target.parentNode.parentNode.parentNode; 
        if (quantityTarget.innerHTML == 0) {
            underCouurentCount = 0;
            currentCount = 0;
        }
        currMake(plus, minus, quantityTarget);

        let currentType = currenTarget.querySelector('.type-class').firstElementChild.firstElementChild;
        if (currentType.innerHTML == adults) {
            currAdultPrice.innerHTML = priceOfTypeTicket[`adult${includeItem}`] * +quantityTarget.innerHTML;
        } else if (currentType.innerHTML == kids) {
            currKidPrice.innerHTML = priceOfTypeTicket[`kid${includeItem}`] * +quantityTarget.innerHTML;
        } else if (devType[includeItem - 1].value !== notSpecified) {
            let temp;
            for (let key in typeTicketObject) {
                if (devType[includeItem - 1].value == typeTicketObject[key]) {
                    temp = key;
                }
            }
            currTypePrice.innerHTML = priceOfTypeTicket[temp] * +quantityTarget.innerHTML;
        }
        

        sumPrice.innerHTML = (+currAdultPrice.innerHTML) + (+currKidPrice.innerHTML) + (+currTypePrice.innerHTML);
    });


});

orderBtns.forEach((e, i) => {
    if (devType[i].value == notSpecified) {
        ticketPrice[i].firstElementChild.innerHTML = priceOfTypeTicket.notSpecified;
    }

    e.addEventListener('click', (event) => {
        function collapseTable() {

            let target = event.target;
            let item = target.parentNode.parentNode.parentNode.parentNode;
            let itemTitle = item.firstElementChild.firstElementChild.innerHTML;
            let currentOrder;
            
            ticketTitle.forEach((e, i) => {
                if (itemTitle === e) {
                    currentOrder = i;
                }
            });

            let titleOrderId = ticketTitle[currentOrder];
            let date = new Date();

            function changeDate(data) {
                if (data < 10) {
                    return '0' + data;
                } else {
                    return data;
                }
            }
            let month = changeDate(date.getMonth() + 1);
            let days = changeDate(date.getDate());
            let hours = changeDate(date.getHours());
            let minuts = changeDate(date.getMinutes());
            let seconds = changeDate(date.getSeconds());
            let currentYmd = `${date.getFullYear()}-${month}-${days}`;
            let currentHms = `${hours}:${minuts}:${seconds}`;
            let currentDate = `${currentYmd}, ${currentHms}`;

            let descriptionCollection = {};


            let typeTicketQuantity = typeTicket[i].parentNode.parentNode
                                    .lastElementChild.firstElementChild
                                    .firstElementChild.innerHTML;

            
            let adultQuantity = item.firstElementChild.querySelector('.adult-qblock')
                                .firstElementChild.firstElementChild.innerHTML;
            let kidQuantinty = item.firstElementChild.nextElementSibling.querySelector('.kid-qblock')
                                .firstElementChild.firstElementChild.innerHTML;
            let eventDate = [...item.querySelectorAll('.development__date')].map(e => e.firstElementChild.innerHTML);
            let barcode =  [...item.querySelectorAll('.development__barcode')].map(e => e.firstElementChild.innerHTML);
            let ticketTypes = [...item.querySelectorAll('.types')].map(e => e.innerHTML);
            let ticketVarTypes = [...item.querySelectorAll('.development__type')].map(e => e.value);
            let quantityAll = [...item.querySelectorAll('.quantity-all')].map(e => e.innerHTML);
            let price = [...item.querySelectorAll('.price')].map((e,i) => e.innerHTML / quantityAll[i]);

            let sum = [...item.querySelectorAll('.development__equal-price')].map(e => e.innerHTML);
            



            let ticketBarcode = genTicketBarcode(quantityAll);
            console.log(countOrder)
            let tempArray = [
                countOrder++,
                userId[currentOrder],
                eventId[currentOrder],
                eventDate.join(''),
                barcode.join(''),                     
                ticketTypes.concat(ticketVarTypes),
                quantityAll,
                price,
                'null',
                sum.join(''),
                currentDate
            ];

            let setTicket = (obj) => {
                ticketDataName.forEach((e, i) => {

                    if (!Array.isArray(tempArray[i])){
                        obj[e] = tempArray[i]; 
                    } else {
                        let arrDel = [];

                        quantityAll.forEach((e, j) => {
                            if(e === '0' || NaN) {
                                false;
                            } else {
                                arrDel.push(tempArray[i][j]);
                            }
                        });
                        obj[e] = arrDel;
                    }
                });
                if (ticketBarcode == null || undefined) {
                    obj['ticket_barcode'] = '...';
                } else {
                    obj['ticket_barcode'] = ticketBarcode;
                    
                }
                
                
            }
            if (devType[i].value == notSpecified && (+typeTicketQuantity)) {
                alert('Не указан тип или количество билетов');
            } else if ((+kidQuantinty) || (+adultQuantity) || (+typeTicketQuantity)) {
                if (typeTicket[i].value == notSpecified) {
                    if (!ticketCollection[titleOrderId]) {
                        let newArray = [];
                        ticketCollection[titleOrderId] = newArray;
                        newArray.push(descriptionCollection);

                        setTicket(descriptionCollection);

                        
                    } else {
                        let descriptionCollection = {};

                        ticketCollection[titleOrderId].push(descriptionCollection);
                        setTicket(descriptionCollection);
                    }
                } else if (benefit || group == typeTicket[i].value) {
                    if (!ticketCollection[titleOrderId]) {
                        let newArray = [];

                        ticketCollection[titleOrderId] = newArray;
                        newArray.push(descriptionCollection);
                        setTicket(descriptionCollection);

                        
                    } else {
                        let descriptionCollection = {};
                        ticketCollection[titleOrderId].push(descriptionCollection);
                        setTicket(descriptionCollection);
                    }
                }

                
                return ticketCollection, countOrder;
                
            } else (
                alert('Не указан тип или количество билетов')
            )            
            
        }
        collapseTable();
        localStorage.setItem('barcodeCounter', JSON.stringify(countTbc));
        localStorage.setItem('orders', JSON.stringify(countOrder));
        localStorage.setItem('tickets', JSON.stringify(ticketCollection));
        relink(ticketCollection);
        location.reload();
    });
});

function relink(data) {
    let newCollectionForTable = {};
    let result = '';
    let count = 0;
    let temp;
    let tempRow;
    for (let key in data) {
        let tbody;
        let ticketTitle;
        let ticketItemsName = '';
        let ticketItemsData = '';
        if (!key.match(/^[0-9]/g)) {
            newCollectionForTable[key] = data[key].length;
            ticketTitle = `<tr><td colspan="12" class="ticket-title">${key}</td></tr>`;
        }
        if (Array.isArray(data[key])) {
            if (data[key][0]) {

                temp = Object.keys(data[key][0]); 
                temp = temp.map(e => `<td>${e}</td>`).join('')
                ticketItemsName += `<tr>${temp}</tr>`;
            }
            for (let i of data[key]) {
                temp = [];
                let quantity;
                let quantityLength = i.quantity.length;
                for (let j in i){
                    if (Array.isArray(i[j])) {
                        temp.push(i[j].length)
                        if (i.quantity) {
                            quantity = i.quantity.reduce((a, b) => (+a) + (+b));
                        }
                    }
                }
                temp = Math.max.apply(null, temp);
                let warm = quantity;
                for (let k = 0; k < temp; k++) {
                    let tempLineRow = 0;
                    tempRow = '';
                    for (let j in i) {
                        if (typeof i[j] !== 'object') {
                            if (warm == quantity) {
                                tempRow += `<td rowspan="${quantity}">${i[j]}</td>`;
                            } else {
                                tempRow += ``;
                            }
                        }
                         else {
                            let tempArray = []; 
                            if(i[j].length == quantityLength) {
                                if (j === 'quantity') {
                                    tempArray = Array.from(Array(+`${quantity}`).keys()).map(e => e = 1);
                                } else {
                                    i[j].forEach((e, d, arr) => {
                                        let tempCount = 0;
                                        while(tempCount < i.quantity[d]) {
                                            tempArray.push(e);
                                            tempCount++;
                                        }
                                    });
                                }
                                tempRow += `<td class="ticket-${j}--${i.id}">${tempArray[k]}</td>`;
                            } else {
                                tempRow += `<td class="${j}--${i.id}">${i[j][k]}</td>`;
                            }
                            
                        }
                        
                    }
                    // if (k == 0) {
                    //     tempRow += `<td rowspan="${quantity}">`;
                    // }
                    warm--;
                    tempLineRow = 0;
                    ticketItemsData += `<tr>${tempRow}</tr>`
                }
            }
        }
        
        tbody = `<tbody>${ticketTitle}${ticketItemsName}${ticketItemsData}</tbody>`;
        result += tbody;
        count++;
    }
    
    if (!tableBlock.firstElementChild) {
        table.insertAdjacentHTML('beforeend', result);
        tableBlock.append(table);   
        tableBlock.firstElementChild.classList.add('table-ticket');
        
    } else {

        tableBlock.firstElementChild.innerHTML = ''
        tableBlock.firstElementChild.remove();
        relink(ticketCollection)
    }

    
}

clearLocalStorageBtn.addEventListener('click', () => {
    if (tableBlock.firstElementChild !== null) {
        tableBlock.firstElementChild.innerHTML = ''
        tableBlock.firstElementChild.remove();
    }
    localStorage.clear();
    location.reload();
})

