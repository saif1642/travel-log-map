const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router  = Router();

router.get('/', async (req, res, next) => {
    try{
        const entries = await LogEntry.find();
        res.json(entries);
    }catch(err){
        next(err);
    }
   
})

router.post('/', async (req, res, next) => {
    try{
        console.log(req.body);
        const logEntry = new LogEntry(req.body);
        const createdLogEntry = await logEntry.save();
        res.json(createdLogEntry)

    }catch(err){
        if(err.name === 'ValidationError'){
            res.status(422);
        }
        next(err)
    }
    

})


module.exports = router;