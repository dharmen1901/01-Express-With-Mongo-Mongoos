const router = require('express').Router();
var pdf = require("pdf-creator-node");
var fs = require('fs');
// Read HTML Template
var html = fs.readFileSync('pdfTemplate.html', 'utf8');

router.route('/generataPDF').get((req, res) => {
    var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;"><h1>Brand It Digital Solutions\'s Bill</h1></div>'
        },
        "footer": {
            "height": "28mm",
            "contents": {
            first: 'This is Computer generated Bill.',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
    };

    var users = [
        {
            name:"RSEB",
            age:"26"
        },
        {
            name:"Dave Offset",
            age:"26"
        },
        {
            name:"Agrawal Printers",
            age:"26"
        }
    ]
    var document = {
        html: html,
        data: {
            users: users
        },
        path: "./brandIt.pdf"
    };

    pdf.create(document, options)
    .then(response => {
        console.log(response);
        res.json("PDF Created")

    })
    .catch(error => {
        console.error(error)
    });
})


module.exports = router;