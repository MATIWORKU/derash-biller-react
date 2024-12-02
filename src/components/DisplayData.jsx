import React from "react";
import axios from "axios";

export default function DisplayData({ data, message, setMessage, isSend }){

    async function checkStatus(bill_id){
        try{
            const { data } = await axios.post("http://localhost:5000/status", {bill_id: bill_id});
            // alert(`status: ${data.message}`)
            
            setMessage(data.message);
            
        }catch (err){
            // console.log(err.response.data.message)
            setMessage(err.response.data.message);
            console.log(message);
        }
        
    }

    return(
        <div className="container mt-2 py-5">
            <dl>
                <dt>Bill_id</dt>
                <dd>{data.bill_id}</dd>
                {!isSend && (
                    <>
                        <dt>Bill_Description</dt>
                        <dd>{data.bill_desc}</dd>
                        <dt>Amount</dt>
                        <dd>{data.amount_due}</dd>
                        <dt>Due Date</dt>
                        <dd>{data.due_date}</dd>
                        <button onClick={() => checkStatus(data.bill_id)}>Check Status</button>
                    </>
                )}
                {isSend && (
                    <>
                        <dt>Confirmation</dt>
                        <dd>{data.message}</dd>
                    </>
                )}
            </dl>
            {message !== "" && (
                <div className="container_fluid my-5">
                    <div className="p-5 text-center rounded-3">
                        <p className="lead">
                            {message}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}