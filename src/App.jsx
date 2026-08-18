import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn-SignUp/SignIn/SignIn';
import SignUp from './Components/SignIn-SignUp/SignUp/SignUp';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <>
      <div className="min-h-screen w-full ABody">
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;