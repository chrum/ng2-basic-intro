const { electron } = require('electron');
window.$ = window.jQuery = require('./libs/jquery');

$(document).ready(function () {
    let root = $('#slides');
    slidesLoader.init(root, () => {
        setTimeout(() => {
            $('#step-1').click();
            Prism.highlightAll();
        }, 1000);
        root.jmpress({
            viewPort: {
                maxScale: 1,
                zoomable: 10
            }
        });
    });
    let zoomLevel = 1;
    let zoomInCodes = [43, 9];
    let zoomOutCodes = [45, 15];
    window.addEventListener('keypress', (event) => {
        if (zoomInCodes.indexOf(event.keyCode) > -1) {
            zoomLevel += 0.1;
            require('electron').webFrame.setZoomFactor(zoomLevel);

        } else if (zoomOutCodes.indexOf(event.keyCode) > -1) {
            zoomLevel -= 0.1;
            require('electron').webFrame.setZoomFactor(zoomLevel);
        }
    })
});

let slidesLoader = {
    _slidesOrder: [
        'dumb_component',
        'smart_component',
        'routed_component',
        'component_lifecycle'
    ],
    _allSlides: [
        'intro',
        'about_me',
        'agenda',
        'components_general',
        'components_types',
        'dumb_component',
        'smart_component',
        'routed_component',
        'component_lifecycle',
        'directives',
        'content_projection',
        'template_syntax',
        'data_flow'
    ],
    _root: null,
    _templates: [],
    _afterLoaded: function () {},
    init: function (root, callback) {
        this._root = root;
        this._afterLoaded = callback;

        this._loadTemplates();
    },

    _render() {
        this._templates.sort((a, b) => {
            return a.index - b.index
        }).map((item) => {
            let el = $.parseHTML(
                '<div class="step" data-x="' + item.index * 1200 + '">' +
                    item.html +
                '</div >' 
            );
            this._root.append(el);
        });

        this._afterLoaded();
    },

    _loadTemplates: function () {
        var normalizedPath = require ('path').join (__dirname, 'src/slides');
        let read = 0;
        let fs = require ('fs');
        fs.readdirSync (normalizedPath).forEach ((el, index, arr) => {
            let name = el.replace ('.html', '');
            fs.readFile (normalizedPath + '/' + el, 'utf8', (err, html) => {
                read++;
                let parts = name.split('_');
                parts.shift();
                name = parts.join('_');
                let index = this._slidesOrder.indexOf(name);
                if (index > -1) {
                    this._templates.push({
                        index: this._slidesOrder.indexOf(name),
                        name: name,
                        html: html
                    });
                } else {
                    console.log('File: ' + el + ' not included in the slides list');
                }

                if (read === arr.length) {
                    this._render();
                }
            });
        });
    }
};





