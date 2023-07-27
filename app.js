const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require('./itemRoutes')
const app = express();



app.use(express.json())

app.use('/items', itemRoutes)

app.listen(3000, () => {
    console.log('Running on port 3000')
})