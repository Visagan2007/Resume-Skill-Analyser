import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import Analyze from './Components/Analyze/Analyze';
import AboutUs from './Components/AboutUs/AboutUs';
import SignIn from './Components/SignIn-SignUp/SignIn/SignIn';
import SignUp from './Components/SignIn-SignUp/SignUp/SignUp';
import NavBar from './Components/NavBar/NavBar';
import NotFound from './Components/NotFound/NotFound';

function AppLayout() {
    const location = useLocation();
    const authPaths = ['/SignIn', '/SignUp'];
    const isAuthPage = authPaths.includes(location.pathname);

    return (
        <div className="min-h-screen w-full ABody">
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Analyze' element={<Analyze />} />
                <Route path='/AboutUs' element={<AboutUs />} />
                <Route path='/SignIn' element={<SignIn />} />
                <Route path='/SignUp' element={<SignUp />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            {!isAuthPage && <Footer />}
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppLayout />
        </BrowserRouter>
    );
}

export default App;