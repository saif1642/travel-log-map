const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


const middleweres = require('./middleware');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin:' http://localhost:3000'
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
    console.log(`app listen at http://localhost:${port}`)
})