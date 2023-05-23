import { useContext, useEffect, useState } from 'react';
import { DerivationType, LedgerSigner } from '@taquito/ledger-signer';
import { TezosToolkit } from "@taquito/taquito";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import { UserContext } from "../../../lib/UserContext";
import { TezosContext } from '../../../lib/TezosContext';
import { UserData } from '../../../types';
import config from './../../../config.json';

function LedgerConnectButton() {

    const { setUserData } = useContext(UserContext);
    const { Tezos }: { Tezos: TezosToolkit } = useContext(TezosContext);
    const [message, setMessage] = useState<string>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>(undefined);

    const [displayCustomInputs, setDisplayCustomInputs] = useState<boolean>(false);
    const [derivationPath, setDerivationPath] = useState<string>(config.defaultLedgerDerivationPath);
    const [derivationType, setDerivationType] = useState<number>(DerivationType.ED25519);

    let mobileNavigatorObject: any = window.navigator;
    const ledgerAvailable: boolean = mobileNavigatorObject.hid;

    useEffect(() => {

    }, [])

    const connectLedger = () => {
        setMessage(undefined);
        setErrorMessage(undefined);

        const initTezApp = async () => {

            let transport;

            try {
                console.log("Create a new transport");
                console.log(Tezos);
                try {
                    transport = await TransportWebHID.create();
                }
                catch (error: any) {
                    console.log(error);
                    setErrorMessage(error.message);
                    return;
                }

                setMessage("Please accept request on your Ledger ...")
                const ledgerSigner = new LedgerSigner(
                    transport,
                    derivationPath, //HDPathTemplate(0), // path optional (equivalent to "44'/1729'/1'/0'")
                    true, // prompt optional
                    DerivationType.ED25519 // derivationType optional
                );

                console.log("Set transport as signer")
                Tezos.setProvider({ signer: ledgerSigner });

                //const publicKey = await Tezos.signer.publicKey();
                const publicKeyHash = await Tezos.signer.publicKeyHash();
                setMessage(undefined);
                let newUserData: UserData = {
                    address: publicKeyHash,
                    balance: (await Tezos.tz.getBalance(publicKeyHash)).toNumber(),
                    transport: transport
                };
                setUserData(newUserData);
            }
            catch (error: any) {
                transport.close();
                console.log(error.message);
                console.error(error);
                setMessage(undefined);
                setErrorMessage(error.message);
            }
        }

        initTezApp();
    }

    return (
        <div className="ledger-connect-button">
            <div className="block disclaimer">
                Please connect your Ledger and open Tezos application.
            </div>
            <div className="block button-block">
                <button className="button" onClick={connectLedger} disabled={!ledgerAvailable}>
                    Connect with Ledger
                </button>
            </div>
            <div className='block custom-block'>
                <label className="checkbox">
                    Customize path <input type="checkbox" defaultChecked={displayCustomInputs} onChange={e => setDisplayCustomInputs(e.target.checked)} />
                </label>
                <div className={`block custom-values ${displayCustomInputs ? '' : 'is-hidden'}`}>
                    <div className="columns">
                        <div className='column'>
                            <input className="input" type="text" placeholder="Text input" value={derivationPath} onChange={e => setDerivationPath(e.target.value)} />
                        </div>
                        <div className='column'>
                            <div className='select'>
                                <select value={derivationType} onChange={e => setDerivationType(parseInt(e.target.value))}>
                                    <option value="0">ED25519</option>
                                    <option value="1">SECP256K1</option>
                                    <option value="2">P256</option>
                                    <option value="3">BIP32_ED25519</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block feedback-message">
                {
                    !mobileNavigatorObject.hid &&
                    <span className="message is-danger">
                        <div className="message-body">
                            Available only on Chrome, Edge and Opera.
                        </div>
                    </span>
                }

                {
                    message &&
                    <div>
                        <article className="message is-info">
                            <div className="message-body">
                                {message}
                            </div>
                        </article>
                    </div>
                }

                {
                    errorMessage &&
                    <div>
                        <article className="message is-danger">
                            <div className="message-body">
                                {errorMessage}
                            </div>
                        </article>
                    </div>
                }
            </div>
        </div>
    );
}

export default LedgerConnectButton;