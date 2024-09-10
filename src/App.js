import './App.css';
import RewardApp from './components/RewardApp';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // Add this line
import './styles/background.css';
//import '../styles/Login.css';
import { AuthProvider } from './components/AuthContext'; // Adjust the import path as necessary




function App() {
  return (
    <AuthProvider>

      <div className="App">
        <RewardApp />
      </div>

   </AuthProvider>

  );
}

export default App;
