window.$ = window.jQuery = require('./libs/jquery');


$(document).ready(function () {
    let root = $('#simple');
    templateLoader.init(root, () => {
        root.jmpress();

    });
});

let templateLoader = {
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
            a.id > b.id
        }).map((item) => {
            this._root.append(item.html);
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
                this._templates.push({
                    id: parseInt(name),
                    html: html
                });

                if (read === arr.length) {
                    this._render();
                }
            });
        });
    }
};





