const { electron } = require('electron');
window.$ = window.jQuery = require('./libs/jquery');

let viewParams = {
    zoomLevel: 1,
    topOffset: 0,
    leftOffset: 0
};
let zoomStep = 0.2;
let offsetStep = 2;
let saves = {};
let thumbnailState = false;

// Keys affecting zoom level and panning the view
let zoomInCodes = [43, 9]; // + and ctrl+i
let zoomOutCodes = [45, 15]; // - and /ctrl+o
let W = 119;
let S = 115;
let A = 97;
let D = 100;

let mainContainer = $('#MAIN');
$(document).ready(function () {
    mainContainer = $('#MAIN');
    let faqContainer = $('#faq');
    let slidesRoot = $('#slides');
    slidesLoader.init(slidesRoot, () => {
        setTimeout(() => {
            $('#step-1').click();
            Prism.highlightAll();
        }, 1000);
        slidesRoot.jmpress({
            viewPort: {
                maxScale: 1,
                zoomable: 10
            }
        });
    });


    window.addEventListener('keypress', (event) => {
    //    console.log(event.keyCode);
        if (zoomInCodes.indexOf(event.keyCode) > -1) {
            viewParams.zoomLevel += zoomStep;
            // require('electron').webFrame.setZoomFactor(viewParams.zoomLevel);
            mainContainer.css('transform', 'scale(' + viewParams.zoomLevel + ')');

        } else if (zoomOutCodes.indexOf(event.keyCode) > -1) {
            viewParams.zoomLevel -= zoomStep;
            // require('electron').webFrame.setZoomFactor(viewParams.zoomLevel);
            mainContainer.css('transform', 'scale(' + viewParams.zoomLevel + ')');

        } else if (event.keyCode === W) {
            viewParams.topOffset += offsetStep;
            mainContainer.css('top', viewParams.topOffset + '%');

        } else if (event.keyCode === S) {
            viewParams.topOffset -= offsetStep;
            mainContainer.css('top', viewParams.topOffset + '%');

        } else if (event.keyCode === A) {
            viewParams.leftOffset += offsetStep;
            mainContainer.css('left', viewParams.leftOffset + '%');

        } else if (event.keyCode === D) {
            viewParams.leftOffset -= offsetStep;
            mainContainer.css('left', viewParams.leftOffset + '%');

        // ctrl + digit from 1 to 9 save current view settings
        } else if (event.keyCode >= 17 && event.keyCode <= 25  && event.ctrlKey) {
            saveView(event.keyCode - 16);

            // digit from 1 to 9 loads saved view settings
        } else if (event.keyCode >= 49 && event.keyCode <= 57) {
            loadView(event.keyCode - 48);
        } else if (event.keyCode >= 49 && event.keyCode <= 57) {
            loadView(event.keyCode - 48);
        }
        // else if (event.keyCode === 91) {
        //     // viewParams.zoomLevel += zoomStep;
        //     mainContainer.css('transform', 'scale(0.2,0.2)');
        //     thumbnailState = true;
        // } else if (event.keyCode === 93) {
        //     // viewParams.zoomLevel += zoomStep;
        //     mainContainer.css('transform', 'scale(' + viewParams.zoomLevel + ')');
        //     thumbnailState = false
        // }

    });

    window.addEventListener('keydown', (event) => {

        if (event.keyCode === 191 ) {
            faqContainer.css('z-index','1');
            faqContainer.css('opacity','1');
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.keyCode === 191 ) {
            faqContainer.css('opacity','0');
            setTimeout(() => {
                faqContainer.css('z-index','-1')
            }, 200);
            // faqVisibility = false;
        } else if (event.keyCode >= 49 && event.keyCode <= 57 && event.ctrlKey) {
            console.log(event.keyCode);
            saveView(event.keyCode - 48);
            // digit from 1 to 9 loads saved view settings
        }
    });
});



let saveView = function (saveId) {
    saves[saveId] = JSON.stringify(viewParams);
};

let loadView = function (saveId) {
    if (saves[saveId]) {
        viewParams = JSON.parse(saves[saveId]);
        // require('electron').webFrame.setZoomFactor(viewParams.zoomLevel);
        mainContainer.css('transform', 'scale(' + viewParams.zoomLevel + ')');
        mainContainer.css('top', viewParams.topOffset + '%');
        mainContainer.css('left', viewParams.leftOffset + '%');
    }
};

let slidesLoader = {
    _slidesOrder: [
        'intro',
        'agenda',
        'components_general',
        'dumb_component',
        'smart_component',
        'routed_component',
        'component_lifecycle',
        'data_flow',
        'data_flow_p2',
        'directives',
        'template_syntax',
        'zones',
        'observables',
        'tc39',
        'angular_platform'
    ],
    _allSlides: [
        'intro',
        'agenda',
        'components_general',
        'dumb_component',
        'smart_component',
        'routed_component',
        'component_lifecycle',
        'data_flow',
        'data_flow_p2',
        'directives',
        'template_syntax',
        'zones',
        'observables',
        'tc39',
        'angular_platform'
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





