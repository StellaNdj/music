import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import Album from './pages/Album';
import Artist from './pages/Artist';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div className='h-full'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/artist/:id' element={<Artist/>}/>
            <Route path='/album/:id' element={<Album/>} />
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
