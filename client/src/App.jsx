import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './page/Home/Home';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div>
      <Header></Header>
      <Home></Home>
      <ToastContainer/>
    </div>
  )
}

export default App;
