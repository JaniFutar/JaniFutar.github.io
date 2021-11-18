
let sheet = new GoogleSheet(GOOGLE_SHEET_ID, GOOGLE_API_KEY);

function draw_panels(panels){
    let template = `<div class="flip _EXTRA_CSS_" id="_NAME_">_NAME_</div>
    <div class="panel" style="overflow: hidden;">
        <div class="products">
        </div>
    </div>`

    let target_div = document.getElementsByClassName('all-goods')[0];

    for (panel of panels){

        let html = template.replaceAll('_NAME_', panel.name)
        let extra_css_classes = '';
        if ('css_classes' in panel){
            extra_css_classes = panel.css_classes.join(' ')
        }
        html = html.replaceAll('_EXTRA_CSS_', extra_css_classes);

        target_div.insertAdjacentHTML('beforeend', html);

    }
}

function google_sheet_callback(data){
    
    data = GoogleSheet.parse_raw_data(data);
    let products_div = document.getElementById(data.sheet_name).nextElementSibling.firstElementChild;
    let template = `<div class="products-box">
    <div class="products-pics">
        <img class="products-img" src="_IMAGE_URL_" alt="">
    </div>
    <div class="products-prices">
        <p>_PRODUCT_NAME_<br> _PRODUCT_PRICE_ Ft/_PRODUCT_UNIT_</p>
    </div>
</div>
    `
    for (product of data.values){
        let html = template.replaceAll('_IMAGE_URL_', product.img);
        //let html = template.replaceAll('_IMAGE_URL_', 'static/szárazáru/lencse.jpg'); // TESZT
        html = html.replaceAll('_PRODUCT_NAME_', product.name);
        html = html.replaceAll('_PRODUCT_PRICE_', product.price);
        html = html.replaceAll('_PRODUCT_UNIT_', product.unit);

        products_div.insertAdjacentHTML('beforeend', html);
    }

    let close_button_html = `<a class="close_panel" href="#/">Vissza</a>`;
    products_div.insertAdjacentHTML('beforeend', close_button_html);

    let close_button = products_div.children[products_div.children.length - 1];
    close_button.addEventListener('click', function (e) {
        slideToggle(close_button.parentElement.parentElement, 500)
    });
}

function setup_panel_event_listeners(){
    const flips = document.querySelectorAll('.flip');

    for (let i = 0; i < flips.length; i++) {
        flips[i].addEventListener('click', function (e) {

            let panel = e.target.nextElementSibling;

            // Check if data is already loaded
            if (panel.firstElementChild.children.length <= 1){
                let category = this.id;
                sheet.get_data_from_sheet(category, 'google_sheet_callback');
            }

            all_panels = document.querySelectorAll('.panel');
            all_panels.forEach(function(el) {
                if (el.style.display == 'block' && el !== panel) slideUp(el, 200);
            });

            // With this magic loop we're waiting until
            // there are some elements in the panel
            var interval_loop = setInterval(function(){
                if(panel.firstElementChild.children.length > 1) {
                    slideToggle(panel, 500);
                    clearInterval(interval_loop);
                }
            }, 300);
            
        });
    }


}

draw_panels(CATEGORIES);
setup_panel_event_listeners();


