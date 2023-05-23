import { useContext } from "react";
import UserInfo from "./UserInfo";
import DisconnectButton from "./ledger/DisconnectButton";
import ConnectButton from "./ledger/LedgerConnectButton";
import { UserContext } from "../../lib/UserContext";
import NetworkSelector from "./NetworkSelector";

function Wallet() {

    const { userData, setUserData } = useContext(UserContext);

    return (
        <div>
            <UserContext.Provider value={{ userData, setUserData }}>
                <div className="card">
                    <div className="card-content">

                        <div className="columns">
                            <div className="column">
                                <NetworkSelector />
                            </div>
                        </div>

                        {
                            userData &&
                            <div className="columns">
                                <div className="column">
                                    <UserInfo />
                                    <DisconnectButton />
                                </div>
                            </div>
                        }

                        {
                            !userData &&
                            <div>
                                <div className="columns">
                                    <div className="column">
                                        <ConnectButton />
                                    </div>
                                    <div className="column">

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </UserContext.Provider>
        </div>
    );
}

export default Wallet;