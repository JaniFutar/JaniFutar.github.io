// A document ready akkor fut le amikor betolt az oldal, szoval eleg egy document ready blokkba tenni a fuggvenyeid - nem kell mindegyiknek kulon
$(document).ready(function () {

    $('.acat').click(function () {

        for (let i = 0; i < 7; i++) {
            $("#panel" + i.toString()).slideUp("slow");
        }
    });

    /*
      $("#flip1").click(function(){
        // Eloszor csukjuk be a tobbi elemet:
        $("#panel2").slideUp("slow");
        $("#panel3").slideUp("slow");
        $("#panel4").slideUp("slow");
        $("#panel5").slideUp("slow");
        $("#panel6").slideUp("slow");
        // Es utana johet az aktualis elemnek a kinyitasa vagy becsukasa (attol fuggoen, hogy epp milyen allapotban van)
        $("#panel1").slideToggle("slow");
  });*/




    //Mivel ezt mindegyik panelre meg kell csinalni ezert eleg sok copy-paste munka lenne ezzel - viszont egy (na jo, ketto) "for" ciklussal megoldhatjuk okosba :D

    for (let i = 1; i < 9; i++) { // Ez ugye 1-6-ig fog porogni
        console.log(i);

        // Taroljuk el a panelek szamait
        let panel_numbers = [1, 2, 3, 4, 5, 6, 7, 8];
        // Es toroljuk ki belole az aktualis panel szamat
        // Sajnos ez eleg csunya JS-ben :(
        let index = panel_numbers.indexOf(i);
        if (index !== -1) {
            panel_numbers.splice(index, 1);
        }
        // Most menjunk vegig az osszes flip-en:
        $("#flip" + i.toString()).click(function () {
            // Azon belul pedig az osszes panelen (kiveve a jelenlegit - amit fentebb kiszedtunk ebbol a listabol)
            for (let panel_number of panel_numbers) {
                // Es csukjuk be oket
                $("#panel" + panel_number.toString()).slideUp(0);// Ha nem szoveget adsz meg, hanem szamot, akkor az milisec-ben ertelmezi es 0-nal azonnal bezarja 
            }
            // A jelenlegit pedig allitsuk at
            $("#panel" + i.toString()).slideToggle("slow");
        });

    }


    for (let i = 1; i < 7; i++) {
        console.log(i);
        let alapvetoPanelNumbers = [1, 2, 3, 4, 5, 6];
        let index2 = alapvetoPanelNumbers.indexOf(i);
        if (index2 !== -1) {
            alapvetoPanelNumbers.splice(index2, 1);
        }
        $("#alapvetoFlip" + i.toString()).click(function (){
            for (let alapvetoPanelNumber of alapvetoPanelNumbers) {
                $("#alapvetoPanel" + alapvetoPanelNumber.toString()).slideUp(0);
            }
            $("#alapvetoPanel" + i.toString()).slideToggle("slow");
            });

    }

    for (let i = 1; i < 7; i++) {
        console.log(i);
        let higeniaPanelNumbers = [1, 2, 3, 4, 5, 6];
        let index3 = higeniaPanelNumbers.indexOf(i);
        if (index3 !== -1) {
            higeniaPanelNumbers.splice(index3, 1);
        }
        $("#higeniaFlip" + i.toString()).click(function (){
            for (let higeniaPanelNumber of higeniaPanelNumbers) {
                $("#higeniaPanel" + higeniaPanelNumber.toString()).slideUp(0);
            }
            $("#higeniaPanel" + i.toString()).slideToggle("slow");
            });

    }



});

let carts = document.querySelectorAll('.basket-btn');

let products = [
    {
        name: 'zöldség',
        tag: 'zöldség',
        price: 169,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers();
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.basket-btn span').textContent = productNumbers;
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.basket-btn span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.basket-btn span').textContent = 1;
    }
}

onLoadCartNumbers();