import { TezosToolkit } from '@taquito/taquito';
import { createContext } from 'react';
import config from '../config.json';

export const TezosContext = createContext(new TezosToolkit(config.rpcUrl));