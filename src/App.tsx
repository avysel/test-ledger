import React, { createContext, useState } from 'react';
import Wallet from './components/wallet/Wallet';
import { TezosToolkit } from '@taquito/taquito';
import { UserData } from './types';
import { TezosContext } from './lib/TezosContext';
import { UserContext } from './lib/UserContext';


function App() {

  const [Tezos, setTezos] = useState<TezosToolkit>(new TezosToolkit('https://mainnet.api.tez.ie'));
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  return (
    <TezosContext.Provider value={Tezos}>
      <UserContext.Provider value={{ userData, setUserData }}>
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
