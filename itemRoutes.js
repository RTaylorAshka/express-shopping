const express = require('express');
const items = require('./fakeDb')
const router = new express.Router()

// GET / items - this should render a list of shopping items.
// Here is what a response looks like:
// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
router.get('/', (req, res) => {

    return res.json(items)

})

// POST / items - this route should accept JSON data and add it to the shopping list.
// Here is what a sample request / response looks like:
// {“name”:”popsicle”, “price”: 1.45 } => {“added”: {“name”: “popsicle”, “price”: 1.45 } }
router.post('/', (req, res) => {
    console.log(req.body)
    items.push(req.body)
    return res.json({ 'added': req.body })
})

// GET / items /: name - this route should display a single item’s name and price.
// Here is what a sample response looks like:
// {“name”: “popsicle”, “price”: 1.45 }
router.get('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name)
    return res.json(item)
})

// PATCH / items /: name, this route should modify a single item’s name and / or price.
// Here is what a sample request / response looks like:
// {“name”:”new popsicle”, “price”: 2.45 } => {“updated”: {“name”: “new popsicle”, “price”: 2.45 } }
router.patch('/:name', (req, res) => {
    let item = items.find(i => i.name === req.params.name)


    items[items.indexOf(item)].name = req.body.name;
    items[items.indexOf(item)].price = req.body.price;

    return res.json({ 'updated': items[items.indexOf(item)] })
})

// DELETE / items /: name - this route should allow you to delete a specific item from the array.
// Here is what a sample response looks like:
// { message: “Deleted” }
router.delete('/:name', (req, res) => {
    let item = items.find(i => i.name === req.params.name)
    items.splice(items.indexOf(item), 1)

    return res.json({ 'message': 'Deleted' })
})

module.exports = router;