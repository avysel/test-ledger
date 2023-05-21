import { useContext } from "react";
import { UserContext } from "../../lib/UserContext";
import { UserData } from "../../types";

function UserInfo() {

    const {userData} = useContext(UserContext);

    return (

        <div className="user-info-card">
            <p className="card-header-title">
                User info
            </p>

            {
                userData &&
                <div className="user-data">
                    <p>Address: {userData.address}</p>
                    <p>Balance: {userData.balance / 1000000} ꜩ</p>
                </div>
            }

            <div className="card-content">

            </div>
        </div>
    )
}

export default UserInfo;