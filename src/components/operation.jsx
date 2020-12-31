import { useState } from 'react';
import apiManager from '../api/api-manager'

function Operations(props) {
    const {balance,updateTransactions} = props

    //inputs
    const [amount,setAmount] = useState(0)
    const [category,setCategory] = useState("")
    const [vendor,setVendor] = useState("")
    const [date,setDate] = useState("")
    let type = 0

    const inputSetters = {
        amount: setAmount,
        category: setCategory,
        vendor: setVendor,
        date: setDate
    }

    const inputHandler = e => {
        const {value,name} = e.target
        inputSetters[name](value.toLowerCase())
    }
    //inputs

    const [alertError,alertSuccess] = props.alert

    const error = msg => {
        alertError(msg)
        return false
    }

    const isValidInput = d => {
        if(amount < 1)
            return error("Amount cannot be negative or 0.")

        //will show insuficient funds only if the day of the transaction is today else its in the past so it can go under... i guess
        const currentDate = new Date()
        currentDate.setHours(0,0,0,0);
        if(currentDate.getTime()  === d.getTime())
            if(balance + (type * amount) < 0 && balance + (type * amount) < balance)
                return error("Insufficient Funds.")
        if(category === "")
            return error("Category can not be empty.")
        if(vendor === "")
            return error("Vendor can not be empty.")


        return true
    }


    const addTrans = async () => {
        const d = (date === "" ? new Date() : new Date(date))
        d.setHours(0,0,0,0);
        if(isValidInput(d)){
            const status = await apiManager.addTransaction({
                amount: (amount * type),
                vendor,category,
                date: d 
            })
            if(status.status === 200){
                alertSuccess("Transaction saved")
                updateTransactions()
            }
            else
                alertError(`Error while saving ${status.status}`)
        }
    }

    const deposit = () => {
        type = 1
        addTrans()
    }
    const withdraw = async () => {
        type = -1
        addTrans()
    }

  return (
        <div className="row mid-page">
            <input className="col s12 l6 offset-l3 center" name="amount" placeholder="*Amount $" type="number" onChange={inputHandler}></input>
            <input className="col s12 l6 offset-l3 center" name="category" placeholder="*Category"  onChange={inputHandler}></input>
            <input className="col s12 l6 offset-l3 center" name="vendor" placeholder="*Vendor"  onChange={inputHandler}></input>
            <input className="col s12 l6 offset-l3 center"  id="date-input" name="date" type="date" onChange={inputHandler}></input>
            <div className="col s12 l6 offset-l3 center" id="date-info">Date of transaction(if untouched it will take current time)</div>
            <div >
                <a className="col s5 offset-s1 l2 offset-l4 waves-effect waves-light btn red lighten-2" onClick={deposit}>Deposit</a>
                <a className="col s5 l2 waves-effect waves-light btn red lighten-2" onClick={withdraw}>Withdraw</a>
            </div>
        </div>
  );
}

export default Operations;
