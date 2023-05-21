import React, { useState } from 'react';
import Wallet from './components/wallet/Wallet';
import { TezosToolkit } from '@taquito/taquito';
import { UserData } from './types';
import { TezosContext } from './lib/TezosContext';
import { UserContext } from './lib/UserContext';
import Transaction from './components/content/Transaction';


function App() {

  const [Tezos] = useState<TezosToolkit>(new TezosToolkit('https://ghostnet.tezos.marigold.dev/'));
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  return (
    <TezosContext.Provider value={Tezos}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className='columns'>
          <div className='column'>
            <Wallet />
          </div>
        </div>

        {
          userData &&
          <div className='columns'>
            <div className='column'>
              <Transaction />
            </div>
          </div>
        }

      </UserContext.Provider>
    </TezosContext.Provider>
  );
}

export default App;
