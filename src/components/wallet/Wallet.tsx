import { useContext } from "react";
import { UserContext } from "../../lib/UserContext";
import { UserData } from "../../types";
import UserInfo from "./UserInfo";
import DisconnectButton from "./DisconnectButton";
import ConnectButton from "./ConnectButton";

function Wallet() {

    let userData: UserData | undefined = useContext(UserContext);

    return (
        <>
            <div className="card">

                {
                    userData &&
                    <p>
                        <UserInfo />
                        <DisconnectButton />
                    </p>
                }

                {
                    !userData &&
                    <p>
                        <ConnectButton/>
                    </p>
                }
            </div>
        </>
    );
}

export default Wallet;