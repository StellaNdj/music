import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import Home from './pages/Home';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Home/>
      </AuthContextProvider>
    </>
  );
}

export default App;
