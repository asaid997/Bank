const express = require('express')
const router = express.Router()

const Transaction = require('../models/transaction')

router.get('/transactions',async function (request, response) {
    const data = await Transaction.find({})
    response.send(data)
})


router.post(`/transaction`, async function (request, response) {
    const transaction = request.body
    const t = new Transaction(transaction)
    response.send(await t.save())
})

router.delete(`/transaction/:id`, async function (request, response) {
    const { id } = request.params
    const deleteStatus = await Transaction.find({ _id: id }).deleteOne()
    response.send(`${deleteStatus.deletedCount}`)
})

module.exports = router