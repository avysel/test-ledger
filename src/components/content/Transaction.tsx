import { useContext, useState } from "react";
import { UserContext } from "../../lib/UserContext";
import { TezosToolkit } from "@taquito/taquito";
import { TezosContext } from "../../lib/TezosContext";

function Transaction() {

    const { userData } = useContext(UserContext);
    const Tezos: TezosToolkit = useContext(TezosContext);
    const [message, setMessage] = useState<string>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>(undefined);

    const send = () => {
        setMessage(undefined);
        setErrorMessage(undefined);
        const amount = 1;
        const address = userData.address;

        console.log(`Transfering ${amount} ꜩ to ${address}...`);
        setMessage(`Transfering ${amount} ꜩ to ${address}... Please confirm transaction on your Ledger.`);
        Tezos.wallet
            .transfer({ to: address, amount: amount })
            .send()
            .then((op) => {
                console.log(`Waiting for ${op.opHash} to be confirmed...`);
                setMessage(`Waiting for ${op.opHash} to be confirmed...`);
                return op.confirmation(1).then(() => op.opHash);
            })
            .then((hash) => { console.log(`hash: ${hash}`); setMessage(`Operation injected: https://ghost.tzstats.com/${hash}`) })
            .catch((error) => { setErrorMessage(`${error.message}`); console.log(error) });
    }

    return (
        <>
            <div className="card">
                <div className="card-content">
                    <p>Transaction:</p>
                    <p><button className="button" onClick={send}>Send 1 tez to me</button></p>
                </div>
                <div>
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
        </>
    )
}

export default Transaction;