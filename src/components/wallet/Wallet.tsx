import { useContext } from "react";
import { UserContext } from "../../lib/UserContext";
import { UserData } from "../../types";
import UserInfo from "./UserInfo";
import DisconnectButton from "./DisconnectButton";
import ConnectButton from "./ConnectButton";

function Wallet() {

    let userData: UserData | undefined = useContext(UserContext);

    

    return (
        <div>
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
                        <ConnectButton/>
                    </div>
                }
            </div>
        </div>
    );
}

export default Wallet;