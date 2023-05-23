import { TezosToolkit } from '@taquito/taquito';
import config from './../../config.json';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { TezosContext } from '../../lib/TezosContext';
import { UserContext } from '../../lib/UserContext';
import { getDefaultNetwork } from '../../Utils';

function NetworkSelector() {

    const [selectedNetwork, setSelectedNetwork] = useState<string>(getDefaultNetwork().name);
    const [previousNetwork, setPreviousNetwork] = useState<string>(getDefaultNetwork().name);

    const { userData, setUserData } = useContext(UserContext);
    const { Tezos, setTezos }: { Tezos: TezosToolkit, setTezos: Dispatch<SetStateAction<any>> } = useContext(TezosContext);
    const [displayNetworkChangeModal, setDisplayNetworkChangeModal] = useState<boolean>(false);

    const disconnectLedger = () => {

        if (userData !== undefined) {
            userData.transport.close();
            setUserData(undefined);
            Tezos.setSignerProvider(undefined);
        }
    }

    const networkList = () => {
        return config.networks.map((network) => {
            return <option value={network.name} key={network.name}>{network.name}</option>
        })
    }

    const displayModal = (e) => {
        setDisplayNetworkChangeModal(true);
    }

    const hideModal = () => {
        setDisplayNetworkChangeModal(false);
    }

    const cancel = () => {
        hideModal();
        setSelectedNetwork(previousNetwork);
    }

    const confirm = () => {
        hideModal();
        disconnectLedger();
        update(selectedNetwork);
    }

    const update = (newValue: string) => {
        const newNetwork = config.networks.find(network => network.name === newValue);
        const newTezos: TezosToolkit = new TezosToolkit(newNetwork.rpcUrl);
        setTezos(newTezos);
    }

    const changeNetwork = (e) => {
        //e.preventDefault();
        setPreviousNetwork(selectedNetwork);
        setSelectedNetwork(e.target.value);
        if (userData === undefined) {
            update(e.target.value);
        }
        else {
            displayModal(e.target.value);
        }
    }

    return (
        <>
            <div className="select network-selector">
                <select value={selectedNetwork} onChange={changeNetwork}>
                    {networkList()}
                </select>
            </div>

            <div className={`modal is-clipped ${displayNetworkChangeModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-content">

                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">
                                You will have to reconnect your wallet. Continue?
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                <div className="columns">
                                    <div className='column'>
                                        <button className="button is-success" onClick={confirm}>Yes, disconnect</button>
                                    </div>
                                    <div className='column'>
                                        <button className="button is-warning" onClick={cancel}>No, keep me connected</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={hideModal}></button>
            </div>
        </>
    )
};

export default NetworkSelector;