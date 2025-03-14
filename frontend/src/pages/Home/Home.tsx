import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <div >
            <h2>Home</h2>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}
