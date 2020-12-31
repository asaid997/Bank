const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    vendor: String,
    date: Date
})

const Transaction = mongoose.model('transactions',transactionSchema)

module.exports = Transaction