import './App.css'
import Layout from "./layouts/Layout.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
//import { Toaster } from 'react-hot-toast';
import {Toaster} from '@/components/ui/sonner.tsx';

function App() {
    return (
        <AuthProvider>
            <Layout/>
            <Toaster duration={2000}
                     style={{
                         fontFamily: 'Vazirmatn FD'
                     }}
                     richColors={true}
                     closeButton={true}
                     position='top-center'/>
        </AuthProvider>
    )
}

export default App
