import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { useRef, ViewTransition } from 'react';
import './App.css';
import Footer from './Components/Footer/Footer.jsx';
import Home from './Components/Home/Home.jsx';
import Analyze from './Components/Analyze/Analyze.jsx';
import { ProfileDraftProvider } from './Components/Analyze/ProfileDraftContext.jsx';
import AboutUs from './Components/AboutUs/AboutUs.jsx';
import SignIn from './Components/SignIn-SignUp/SignIn/SignIn.jsx';
import SignUp from './Components/SignIn-SignUp/SignUp/SignUp.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import Settings from './Components/Settings/Settings.jsx';
import LiquidGlassEffects from './Components/UI/liquid-glass/index.jsx';
import GlassScenery from './Components/UI/GlassScenery.jsx';
import useRouteEffects from './hooks/useRouteEffects.js';
import useSmoothScroll from './hooks/useSmoothScroll.js';
import useTheme from './useTheme.js';
import './liquid-glass.css';

function AppLayout() {
  useSmoothScroll();
  const { theme, setTheme } = useTheme();
  const contentRef = useRef(null);
  const { pathname, navigationType } = useRouteEffects(contentRef);
  const isAuthPage = ['/signin', '/signup'].includes(pathname.replace(/\/+$/, '').toLowerCase());

  return (
    <div className="ABody">
      <GlassScenery />
      <LiquidGlassEffects />
      <Link className="skip-link" to="#main-content">
        Skip to content
      </Link>
      <NavBar />
      <ViewTransition update={navigationType === 'POP' ? 'none' : 'page-transition'}>
        <div ref={contentRef} className="route-content">
          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Analyze" element={<Analyze />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route
                path="/Settings"
                element={<Settings theme={theme} onThemeChange={setTheme} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {!isAuthPage && <Footer />}
        </div>
      </ViewTransition>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter useTransitions>
      <ProfileDraftProvider>
        <AppLayout />
      </ProfileDraftProvider>
    </BrowserRouter>
  );
}
