import { useContext } from "react";
import UserInfo from "./UserInfo";
import DisconnectButton from "./ledger/DisconnectButton";
import ConnectButton from "./ledger/LedgerConnectButton";
import { UserContext } from "../../lib/UserContext";

function Wallet() {

    const { userData, setUserData } = useContext(UserContext);

    return (
        <div>
            <UserContext.Provider value={{ userData, setUserData }}>
                <div className="card">
                    <div className="card-content">

                        {
                            userData &&
                            <div>
                                <UserInfo />
                                <DisconnectButton />
                            </div>
                        }

                        {
                            !userData &&
                            <div>
                                <ConnectButton />
                            </div>
                        }
                    </div>
                </div>
            </UserContext.Provider>
        </div>
    );
}

export default Wallet;