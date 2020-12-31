import Transactions from "./transactions";
import M from 'materialize-css'
import { useEffect } from "react";


function Categories(props) {
    const { transactions } = props

    const categories = {}

    transactions.forEach(t => categories[t.category] ? categories[t.category].push(t) : categories[t.category] = [t])

    useEffect(() => {
        const elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems);
    })

    return (
        <div>
            {transactions.length ? (
                <div>
                    <ul className="collapsible">
                        {Object.keys(categories).map(key => {
                            return (
                                <li>
                                    <div className="collapsible-header">{`${key[0].toUpperCase()}${key.slice(1)}`}</div>
                                    <div className="collapsible-body">
                                        <Transactions key={key} id={key} transactions={categories[key]} deleteTrans={props.deleteTrans} />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ) :
                <h3 className="mid-page center-align">No transactions done yet, go to operations and add transactions</h3>}
        </div>
    );
}

export default Categories;
