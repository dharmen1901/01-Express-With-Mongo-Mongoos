const router = require('express').Router();
let data = require('../models/shipwrecks.model');

router.route('/getData').get((req, res) => {
    data.find()
        .then(rec => res.json(rec))
        .catch(err => res.status(400).json('Error :', err));
})


router.route('/deleteData').delete((req, res) => {
    const record = req.body.record;
    data.deleteOne({data :record})
        .then(rec =>
            {if(rec.ok){
                res.json("Deleted Successfully")
            } else{
                res.json("Please Try Again")}
            })
        .catch(err => res.status(400).json('Error :', err));
})

router.route('/add').post((req, res) => {
    const record = req.body.record;
    const newRecord = new data({ data: record });
    newRecord.save()
        .then(() => res.json('Record Added'))
        .catch(err => res.status(400).json('Error :', err));
})

router.route('/updateRecord').put((req, res) => {
    const findRecord = req.body.record;
    const updateRecord = req.body.updateRecord;
    data.updateOne({data:findRecord},{$set:{data :updateRecord}})
        .then(() => res.json('Record Updated'))
        .catch(err => res.status(400).json('Error :', err));
})

module.exports = router;

