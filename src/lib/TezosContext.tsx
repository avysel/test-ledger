import { TezosToolkit } from '@taquito/taquito';
import { createContext } from 'react';

export const TezosContext = createContext(new TezosToolkit('https://mainnet.api.tez.ie'));