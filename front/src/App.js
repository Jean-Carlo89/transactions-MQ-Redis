import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [userId, setUserId] = useState('1');
  const [phoneNumber, setPhoneNumber] = useState('+17551234587');
  const [amount, setAmount] = useState(12.78);


  const [rechargeResponse, setRechargeResponse] = useState('');
  const [statusResponse, setStatusResponse] = useState('');

  const handleRecharge = async (event) => {
    event.preventDefault();
    const data = {
      user_id: userId,
      phone_number: phoneNumber,
      amount: amount
    };

    try {
      const response = await fetch('http://localhost:3000/api/recharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setRechargeResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      setRechargeResponse(`Erro: ${error.message}`);
    }
  };

  const handleStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/recharge/status?user_id=${userId}&phone_number=${phoneNumber}`);
      const result = await response.json();
      setStatusResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      setStatusResponse(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Testador de API</h1>

     
        <div style={{ marginBottom: '20px' }}>
          <h2>Realizar Recarga (POST)</h2>
          <form onSubmit={handleRecharge}>
            <label>
              ID do Usuário:
              <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
            </label>
            <label>
              Número de Telefone:
              <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </label>
            <label>
              Valor:
              <input type="number" step="0.01" value={amount} onChange={e => setAmount(parseFloat(e.target.value))} />
            </label>
            <button type="submit">Enviar Recarga</button>
          </form>
          <h3>Resposta POST:</h3>
          <pre>{rechargeResponse}</pre>
        </div>

        <hr />

       
        <div>
          <h2>Consultar Status (GET)</h2>
          <p>Os campos de ID e Telefone usam os mesmos valores acima.</p>
          <button onClick={handleStatus}>Consultar Status</button>
          <h3>Resposta GET:</h3>
          <pre>{statusResponse}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;