import { useContext, useEffect } from "react";
import { UserData } from "../../types";
import UserInfo from "./UserInfo";
import DisconnectButton from "./DisconnectButton";
import ConnectButton from "./ConnectButton";
import { UserContext } from "../../lib/UserContext";

function Wallet() {

    const { userData, setUserData } = useContext(UserContext);

    return (
        <div>
            <UserContext.Provider value={{ userData, setUserData }}>
                <div className="card">

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
            </UserContext.Provider>
        </div>
    );
}

export default Wallet;