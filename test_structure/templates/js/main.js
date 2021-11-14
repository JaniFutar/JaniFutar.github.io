

function setup_event_listeners(){
    const flips = document.querySelectorAll('.flip');

    for (let i = 0; i < flips.length; i++) {
        flips[i].addEventListener('click', function (e) {
            // TODO Get data if not exists
            let panel = e.target.nextElementSibling;
            slideToggle(panel, 500);
            all_panels = document.querySelectorAll('.panel');
            all_panels.forEach(function(el) {
                if (el.style.display == 'block' && el !== panel) slideUp(el, 200);
            });
        });
    }

    const close_panel_buttons = document.querySelectorAll('.close_panel');

    for (let i = 0; i < close_panel_buttons.length; i++) {
        close_panel_buttons[i].addEventListener('click', function (e) {
            slideToggle(e.target.parentElement.parentElement, 500)
        });
    }
}

// TODO Body.load
setup_event_listeners()
