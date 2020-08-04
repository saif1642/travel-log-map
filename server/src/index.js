const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const middleweres = require('./middleware');

const app = express();


mongoose.createConnection(process.env.DATABASE_URL,{ useNewUrlParser:true });

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin:process.env.CORS_ORIGIN
}));

app.get('/', (req, res) => {
    res.json({
        message:"Hello World"
    })
})

app.use(middleweres.notFound);
app.use(middleweres.errorHandaler);

const port = process.env.PORT || 1338;

app.listen(port, () => {
    console.log(`app listen at http://localhost:${port}`);
})