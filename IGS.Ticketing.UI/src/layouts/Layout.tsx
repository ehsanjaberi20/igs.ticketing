import Login from "./auth/Login.tsx";
import Main from "./main/Main.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";

function Layout() {
    const {loading, user } = useAuth();

    if (loading)
        return (
            <div className='w-full h-dvh flex justify-center  items-center'>
                <Spinner/>
            </div>
        );
    // if (error)
    //     return <span>{error.message}</span>

    if (user)
        return <Main/>
    return (
        <Login/>
    )
}

export default Layout
