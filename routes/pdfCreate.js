const router = require('express').Router();
var pdf = require("pdf-creator-node");
var fs = require('fs');
// Read HTML Template
var html = fs.readFileSync('pdfTemplate.html', 'utf8');
const AWS = require('aws-sdk');

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET_KEY;
const BUCKET_NAME = process.env.S3_BUCKET;
const FILE_NAME = `Test ${new Date()}.pdf`

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
    //Hard coded data for test
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
        const s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
        const fileContent = fs.readFileSync('brandIt.pdf');
        const params = {
            Bucket: BUCKET_NAME,
            Key: FILE_NAME, // File name you want to save as in S3
            Body: fileContent
        };
        s3.upload(params, function(err, data) {
            if (err) {
                res.json("PDF Not uploaded")
                //throw err;
            }
            res.json("PDF Uploaded to S3 Bucket")
        });
    })
    .catch(error => {
        console.error(error)
        //Todo Error handling in catch block
    });
})


module.exports = router;