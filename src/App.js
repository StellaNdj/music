import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import Album from './pages/Album';
import Artist from './pages/Artist';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import { DarkModeContextProvider } from './contexts/ThemeContext';
import Podcast from './pages/Podcast';
import Audiobook from './pages/Audiobook';
import PodcastEpisode from './pages/PodcastEpisode';
import AudiobookChapter from './pages/AudiobookChapter';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <DarkModeContextProvider>
          <Routes>
            <Route element={<Layout/>  }>
              <Route path='/' element={<Home />} />
              <Route path='/artist/:id' element={<Artist/>}/>
              <Route path='/album/:id' element={<Album/>} />
              <Route path='/search' element={<Search/>}/>
              <Route path='/podcast/:id' element={<Podcast/>} />
              <Route path='/audiobook/:id' element={<Audiobook/> } />
              <Route path='/podcast/episode/:id' element={<PodcastEpisode/> } />
              <Route path='/audiobook/chapter/:id' element={<AudiobookChapter/>}  />
            </Route>
          </Routes>
        </DarkModeContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
