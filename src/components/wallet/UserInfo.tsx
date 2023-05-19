import { useContext } from "react";
import { UserContext } from "../../lib/UserContext";
import { UserData } from "../../types";

function UserInfo() {

    let userData: UserData | undefined = useContext(UserContext);

    return (

        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    User info
                </p>

            </header>
            <div className="card-content">
                <div className="user-data">
                    <p>Address: lkjlkjkljkjkjkl</p> 
                    <p>Balance: 12</p> 
                    {userData}
                </div>
            </div>
        </div>
    )
}

export default UserInfo;