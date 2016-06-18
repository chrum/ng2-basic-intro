window.$ = window.jQuery = require('./libs/jquery');


$(document).ready(function () {
    $('#simple').jmpress();
    /*loadTemplates(() => {

    })*/
});


function loadTemplates(onTemplatesLoaded) {
    var normalizedPath = require ('path').join (__dirname, 'src/slides');
    let templates = {};
    let read = 0;
    let fs = require ('fs');
    fs.readdirSync (normalizedPath).forEach ((el, index, arr) => {
        let name = el.replace ('.html', '');
        fs.readFile (normalizedPath + '/' + el, 'utf8', (err, html) => {
            read++;
            templates[name] = html;

            if (read === arr.length) {
                onTemplatesLoaded();
            }
        });
    });
}




