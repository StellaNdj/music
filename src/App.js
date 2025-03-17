import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import Album from './pages/Album';
import Artist from './pages/Artist';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import { DarkModeContextProvider } from './contexts/ThemeContext';
import Podcast from './pages/Podcast';
import Audiobook from './pages/Audibook';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <DarkModeContextProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/artist/:id' element={<Artist/>}/>
            <Route path='/album/:id' element={<Album/>} />
            <Route path='/search' element={<Search/>}/>
            <Route path='/podcast/:id' element={<Podcast/>} />
            <Route path='/audiobook/:id' element={<Audiobook/> } />
          </Routes>
        </DarkModeContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
