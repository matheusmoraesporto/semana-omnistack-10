import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  // Propriedade com a lsita de devs para listar no main
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  // Função para o button submit
  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    // Inclui o novo dev na listagem
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      {/* Tag da navbar */}
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      {/* Tag do conteúdo main da aplicação */}
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
