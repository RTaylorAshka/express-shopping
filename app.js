const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require('./itemRoutes')
const app = express();



app.use(express.json())

app.use('/items', itemRoutes)

app.use(function (req, res, next) {
    const err = new ExpressError("Page not found", 404);

    return next(err);
});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});

app.listen(3000, () => {
    console.log('Running on port 3000')
})