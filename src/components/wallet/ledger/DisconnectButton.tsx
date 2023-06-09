import { useContext } from "react";
import { UserContext } from "../../../lib/UserContext";
import { TezosToolkit } from "@taquito/taquito";
import { TezosContext } from "../../../lib/TezosContext";

function DisconnectButton() {

    const { userData, setUserData } = useContext(UserContext);
    const { Tezos }: { Tezos: TezosToolkit } = useContext(TezosContext);

    const disconnectLedger = () => {
        if (userData !== undefined) {
            userData.transport.close();
            setUserData(undefined);
            Tezos.setSignerProvider(undefined);
        }
    }

    return (
        <button className="button" onClick={disconnectLedger}>Disconnect Ledger</button>
    );
}

export default DisconnectButton;