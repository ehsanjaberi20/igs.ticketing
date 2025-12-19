import {useAuth} from "../../context/AuthContext.tsx";

function Main() {
    const{user, logoutUser} = useAuth()
    return (
        <div>
            <ul>
                <li>{user?.usrNameStr}</li>
                <li>{user?.usrFamilyStr}</li>
                <li>
                    <button onClick={()=>{
                        logoutUser();
                    }}>logout</button>
                </li>
            </ul>

        </div>
    )
}

export default Main;
