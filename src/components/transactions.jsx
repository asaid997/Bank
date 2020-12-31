import { useEffect, useState } from "react";
import M from 'materialize-css'
import Transaction from "./transaction";


function Transactions(props) {
    const {transactions,id} = props
    const [transactionsFinal,setTransactionsFinal] = useState([])

    const [month,setMonth] = useState("Month")
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const filterByMonth = () => {
        if(month === "All" || month === "Month")
            setTransactionsFinal(transactions)
        else
            setTransactionsFinal(transactions.filter(t => {
                const d = new Date(t.date)
                const tMonth = d.getMonth() -1
                return monthNames[tMonth] === month
            }))
    }
    const monthPicker = e => {
        const m = e.target.name
        setMonth(m)
    }

    //useEffect
    useEffect(() => {
        const elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);
    })
    useEffect(() => setTransactionsFinal(transactions),[])
    useEffect(() => filterByMonth(),[transactions])
    useEffect(() => filterByMonth(),[month])
    //useEffect
    
    return (

        <div>
            <a className='dropdown-trigger btn red darken-4' href='#' data-target={id || "drop1"} >{month}</a>

            <ul id={id || "drop1"} className='dropdown-content'>
                <li><a href="#!" className="red-text text-lighten-1" onClick={monthPicker} name="All">All</a></li>
                {monthNames.map(m => <li><a href="#!" className="red-text text-lighten-1" onClick={monthPicker} name={m}>{m}</a></li>)}
            </ul>
            <table className="centered">
                <thead>
                    <tr className="">
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Vendor</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {transactionsFinal.map(t => <Transaction key={t._id} id={t._id} amount={t.amount} vendor={t.vendor} category={t.category} deleteTrans={props.deleteTrans} date={t.date}/>)}
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;
