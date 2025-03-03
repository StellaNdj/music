import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import Home from './pages/Home';


function App() {
  return (
    <div className='h-full'>
      <AuthContextProvider>
        <Home/>
      </AuthContextProvider>
    </div>
  );
}

export default App;
