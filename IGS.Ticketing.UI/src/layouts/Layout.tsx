import Login from "./auth/Login.tsx";
import Main from "./main/Main.tsx";
import {useAuth} from "../context/AuthContext.tsx";

function Layout() {
    const { loading, user } = useAuth();

    if(loading)
        return <span>loading</span>
    if (user)
        return <Main/>
    return (
        <Login/>
    )
}

export default Layout
