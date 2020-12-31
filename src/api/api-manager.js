import axios from 'axios'

export default  {
    addTransaction: async transaction => await axios.post('http://localhost:3001/transaction',transaction),
    getTransactions: async () => await axios.get('http://localhost:3001/transactions').then(data => data.data),
    deleteTransaction: async id => await axios.delete(`http://localhost:3001/transaction/${id}`).then(status => status)
}
