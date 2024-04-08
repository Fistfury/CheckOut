import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export const Navigation = () => {
    const { state, dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    }
    return (
        <nav>
            <Link to="/">Home</Link>
            {state.isAuthenticated ? (
                <>
                    <Link to="/cart">Cart</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
};