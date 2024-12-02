import React, {useState} from 'react';
import ReadBillForm from './components/ReadBillForm';
import CreateBillForm from './components/CreateBillForm';
import DisplayData from './components/DisplayData';

function App() {

  const [ isSend, setIsSend ] = useState(false);
  const [ data, setData ] = useState({});
  const [ message, setMessage ] = useState("");

  function handleFilterChange(filter){
    setIsSend(filter === "send");
    setData({});
    setMessage('');
  }

  return (
    <div className="container my-5 py-5">
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
        <button onClick={() => handleFilterChange('get')} className="btn-lg px-4 gap-3">Read</button>
        <button onClick={() => handleFilterChange('send')} className="btn-lg px-4">Send</button>
      </div>
      {!isSend ? 
        (<ReadBillForm setData = {setData} setMessage = {setMessage} /> ):
        (<CreateBillForm setData = {setData} setMessage = {setMessage} />)
      }
      
      {data && (
        <DisplayData data={data} message={message} setMessage={setMessage} isSend={isSend}/> 
      )}
    </div>
  );
}

export default App;
