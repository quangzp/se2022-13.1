import logo from '../image/logo.png';
import './index.css';

const Header = () => {
    return (
        <div>
            <img className='logo' src={logo} alt="" />
        </div>
    )
}

export default Header;