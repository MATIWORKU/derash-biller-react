import React, { useState } from "react";
import axios from "axios";

export default function CreateBillForm({ setData, setMessage }) {
    const [ billInfo, setBillInfo ] = useState({
        bill_id: "",
        reason: "",
        amount_due: "",
        due_date: ""
    });

    function handleInputChange(event){
        const { name, value } = event.target;
        setBillInfo((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    async function handleSubmit(event){
        event.preventDefault();
        try{
            const { data } = await axios.post("http://localhost:5000/send", {
                bill_id: billInfo.bill_id,
                reason: billInfo.reason,
                amount_due: billInfo.amount_due,
                due_date: billInfo.due_date
            });
            setData(data);
            setMessage('');
        }catch (err){
            setMessage(err.response.data.message);
        }
    }
    return (
        <form id="book-form" onSubmit={handleSubmit}>
            <input type="text" name="bill_id" id="bill_id" placeholder="Bill ID" required onChange={handleInputChange} value={billInfo.bill_id} />
            <input type="text" name="reason" placeholder="Reason For Bill" required onChange={handleInputChange} value={billInfo.reason} />
            <input type="text" name="amount_due" placeholder="Amount To Be Paid" required onChange={handleInputChange} value={billInfo.amount_due} />
            <input type="date" name="due_date" required onChange={handleInputChange} value={billInfo.due_date} />
            <button type="submit">Create Bill</button>
        </form>
    );
}