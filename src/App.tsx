import React from 'react';
import Wallet from './components/wallet/Wallet';
import { TezosContext } from './lib/TezosContext';
import { UserContext } from './lib/UserContext';
import { TezosToolkit } from '@taquito/taquito';


function App() {
  return (
    <TezosContext.Provider value={new TezosToolkit('https://mainnet.api.tez.ie')}>
      <UserContext.Provider value={undefined}>
        <div className='columns'>
          <div className='column is-four-fifths'>
            <Wallet />
          </div>
          <div className='column'>
            
          </div>
        </div>
      </UserContext.Provider>
    </TezosContext.Provider>
  );
}

export default App;
