import { useContext } from "react";
import { UserContext } from "../../lib/UserContext";
import { UserData } from "../../types";

function UserInfo() {

    let userData: UserData | undefined = useContext(UserContext);

    return (

        <div className="user-info-card">
            <p className="card-header-title">
                User info
            </p>

            {
                userData &&
                <div className="user-data">
                    <p>Address: {userData.address}</p>
                    <p>Balance: {userData.balance}</p>
                </div>
            }

            <div className="card-content">

            </div>
        </div>
    )
}

export default UserInfo;