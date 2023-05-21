import { useContext, useEffect, useState } from 'react';
import { DerivationType, HDPathTemplate, LedgerSigner } from '@taquito/ledger-signer';
import { TezosToolkit } from "@taquito/taquito";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import { UserContext } from "../../lib/UserContext";
import { TezosContext } from '../../lib/TezosContext';
import { UserData } from '../../types';

function ConnectButton() {

    const { setUserData } = useContext(UserContext);
    const Tezos: TezosToolkit = useContext(TezosContext);
    const [message, setMessage] = useState<string>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>(undefined);

    useEffect(() => {

    }, [])

    const connectLedger = () => {
        setMessage(undefined);
        setErrorMessage(undefined);

        const initTezApp = async () => {

            let transport;

            try {
                console.log("Create a new transport");
                transport = await TransportWebHID.create();

                setMessage("Please accept request on your Ledger ...")
                const ledgerSigner = new LedgerSigner(
                    transport,
                    HDPathTemplate(0), // path optional (equivalent to "44'/1729'/1'/0'")
                    true, // prompt optional
                    DerivationType.ED25519 // derivationType optional
                );

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
        <div>
            <div>Please connect your Ledger and open Tezos application.</div>
            <div>
                <button className="button" onClick={connectLedger}>Connect Ledger</button>
            </div>
            <br />
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

    );
}

export default ConnectButton;