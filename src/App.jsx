import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn-SignUp/SignIn/SignIn';
import SignUp from './Components/SignIn-SignUp/SignUp/SignUp';

function App() {
  return (
    <>
      <div className="min-h-screen w-full ABody">
        <BrowserRouter>
          <Routes>
            <Route path='/SignIn' element={<SignIn />}></Route>
            <Route path='/SignUp' element={<SignUp />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;