const express = require('express');
const router = new express.Router()

const CART = [{ "name": "popsicle", "price": 1.45 }, { "name": "cheerios", "price": 3.40 }]
// GET / items - this should render a list of shopping items.
// Here is what a response looks like:
// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
router.get('/', (req, res) => {
    return res.json({ 'items': CART })
})

// POST / items - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request / response looks like:
// {“name”:”popsicle”, “price”: 1.45 } => {“added”: {“name”: “popsicle”, “price”: 1.45 } }

// GET / items /: name - this route should display a single item’s name and price.
// Here is what a sample response looks like:
// {“name”: “popsicle”, “price”: 1.45 }
router.get('/:name', (req, res) => {
    console.log(req.params.name)
    const item = CART.find(i => i.name === req.params.name)
    return res.json(item)
})

// PATCH / items /: name, this route should modify a single item’s name and / or price.
// Here is what a sample request / response looks like:
// {“name”:”new popsicle”, “price”: 2.45 } => {“updated”: {“name”: “new popsicle”, “price”: 2.45 } }

// DELETE / items /: name - this route should allow you to delete a specific item from the array.
// Here is what a sample response looks like:
// { message: “Deleted” }

module.exports = router;