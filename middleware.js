const ExpressError = require('./expressError');


function checkForItem(req, res, next) {
    try {
        let item = items.find(i => i.name === req.params.name)
        if (item == undefined) {
            throw new ExpressError(`Item '${req.params.name}' not found in db`, 404);
        } else {
            return next();
        }
    } catch (e) {
        return next(e);
    }

}

module.exports = { checkForItem };