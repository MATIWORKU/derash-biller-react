import React, {useState} from "react";
import axios from "axios";

export default function ReadBillForm({ setData, setMessage }){
    const [billId, setBillId] = useState("");

    function handleInput(event){
        setBillId(event.target.value);
    }

    async function handleSubmit(event){
        event.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:5000/get", {bill_id: billId});
            setData(data);
            setMessage('');
        }catch (err){
            // alert("Error!!!");
            console.log(err.response.data.message);
            
            setMessage(err.response.data.message);
        }
    }


    return (
        <form onSubmit={handleSubmit}> 
            <input type="text" name="bill_id" id="bill_id" placeholder="Bill ID" value={billId} onChange={handleInput} /> 
            <button type="submit">Read Bill</button>
        </form>
    );
}