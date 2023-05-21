import { useContext } from "react";
import { UserContext } from "../../lib/UserContext";
import { TezosToolkit } from "@taquito/taquito";
import { TezosContext } from "../../lib/TezosContext";

function Transaction() {

    const { userData } = useContext(UserContext);
    const Tezos: TezosToolkit = useContext(TezosContext);

    const send = () => {
        const amount = 1;
        const address = userData.address;

        console.log(`Transfering ${amount} ꜩ to ${address}...`);
        Tezos.wallet
            .transfer({ to: address, amount: amount })
            .send()
            .then((op) => {
                console.log(`Waiting for ${op.opHash} to be confirmed...`);
                return op.confirmation(1).then(() => op.opHash);
            })
            .then((hash) => console.log(`Operation injected: https://ghost.tzstats.com/${hash}`))
            .catch((error) => console.log(`Error: ${error} ${JSON.stringify(error, null, 2)}`));
    }

    return (
        <>
            <div className="card">
                <div className="card-content">
                    <p>Transaction:</p>
                    <p><button className="button" onClick={send}>Send 1 tez to me</button></p>
                </div>
            </div>
        </>
    )
}

export default Transaction;