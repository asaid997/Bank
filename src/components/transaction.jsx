function Transaction(props) {

    const deleteTrans = () => {
        props.deleteTrans(props.id)
    }   

    const {amount,vendor,category,date} = props
    let d = new Date(date)
    d = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`
  return (
    <tr className={props.amount > 0 ? "teal lighten-4" : "red lighten-4"}>
        <td className="center-align">{d}</td>
        <td className="center-align">{amount}</td>
        <td className="center-align">{`${vendor[0].toUpperCase()}${vendor.slice(1)}`}</td>
        <td className="center-align">{`${category[0].toUpperCase()}${category.slice(1)}`}</td>
        <td className="fas fa-trash center-align trash" onClick={deleteTrans}></td>
    </tr>
  );
}

export default Transaction;
