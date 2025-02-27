import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Music Discovery App</h1>
      {console.log(process.env)}
      {console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID)}
    </div>
  );
}

export default App;
