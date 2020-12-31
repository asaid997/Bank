import './App.css';
import 'materialize-css/dist/css/materialize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import {useEffect, useState} from 'react'
import Operations from './components/operation';
import CustomizedSnackbars from './components/snackbars';
import { BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Transactions from './components/transactions';
import apiManager from './api/api-manager'
import Categories from './components/category';



function App() {

  //setUp
  const [balance,setBalance] = useState(0)
  const [transactions,setTransactions] = useState([])

  const updateTransactions = () => apiManager.getTransactions().then(data => setTransactions(data))

  useEffect(() => updateTransactions(),[])

  useEffect(() => {
    let sum = 0 
    transactions.forEach(t => sum += t.amount)
    setBalance(sum)

  },[transactions])
  //setUp

  const deleteTrans = async id => {
    await apiManager.deleteTransaction(id)
    updateTransactions()
  }

  //snackBar 
  const [toShow,setToShow] = useState(false)
  const [severity,setSeverity] = useState("")
  const [message,setMessage] = useState("")

  const alert = (s,t,ts) => {
      setSeverity(s)
      setMessage(t)
      setToShow(ts)
  }

  const alertSuccess = msg=> alert("success",msg,true)
  const alertError = msg=> alert("error",msg,true)

  const handleClose = () => setToShow(false)
  //snackBar 

  return (
    <div>
      <Router>
        <div>
            <nav>
              <div className="nav-wrapper red lighten-1">
                <a className="brand-logo hide-on-small-and-down right"><i className="fas fa-hand-holding-usd logo"></i></a>
                <ul id="nav-mobile" className="left ">
                  <li><span className="hide-on-small-and-down">Balance:</span> {balance}$ </li>
                  <li><Link to="/operations">Operations</Link></li>
                  <li><Link to="/transactions">Transactions</Link></li>
                  <li><Link to="/transactions/categories">Categories</Link></li>

                </ul>
              </div>
            </nav>
          <Route path="/operations" exact render={() => <Operations alert={[alertError,alertSuccess]} balance={balance} updateTransactions={updateTransactions}/>} />
          <Route path="/transactions/categories" exact render={() => <Categories transactions={transactions} deleteTrans={deleteTrans}/>} />
          <Route path="/transactions" exact render={() => <Transactions transactions={transactions} deleteTrans={deleteTrans}/>} />
        </div>
      </Router>
      <CustomizedSnackbars severity={severity} toShow={toShow} message={message} handleClose={handleClose} />
    </div>
  );
}

export default App;