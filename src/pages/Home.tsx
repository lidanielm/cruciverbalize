import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoggedInContext } from '../context/LoggedInContext';
import { getUsernameFromToken, isTokenValid } from '../utils/auth';

const Home = () => {
    const navigate = useNavigate();
    const { loggedInUser, setLoggedInUser } = useContext(LoggedInContext);

    // Add transition delay to the cells
    useEffect(() => {
        const cells = document.querySelectorAll('.home-grid-cell');
        let wordLength = 0;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].classList.contains('clickable')) {
                (cells[i] as HTMLElement).style.transitionDelay = `${wordLength * 0.06}s`;
                wordLength++;
            } else {
                (cells[i] as HTMLElement).style.transitionDelay = '0s';
                wordLength = 0;
            }
        }
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            return;
        }
        const token = localStorage.getItem('token');
        if (token) {
            if (isTokenValid()) {
                setLoggedInUser(getUsernameFromToken());
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedInUser(null);
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <table className="border-4">
                    <tr>
                        {Array(16).fill(null).map(() => {
                            return <td className="home-grid-cell bg-black"></td>
                        })}
                    </tr>
                    <tr>
                        <td className="home-grid-cell bg-black"></td>
                        <td className="home-grid-cell font-bold bg-black text-white ">C</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">R</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">U</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">C</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">I</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">V</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">E</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">R</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">B</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">A</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">L</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">I</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">Z</td>
                        <td className="home-grid-cell font-bold bg-black text-white ">E</td>
                        <td className="home-grid-cell bg-black"></td>
                    </tr>
                    <tr>
                        {Array(16).fill(null).map(() => {
                            return <td className="home-grid-cell bg-black"></td>
                        })}
                    </tr>
                    <tr>{Array(16).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    <tr className="group">
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/create")}>C</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/create")}>R</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/create")}>E</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/create")}>A</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/create")}>T</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/create")}>E</td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                    </tr>
                    <tr>{Array(16).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    <tr className="group">
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/solve")}>S</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/solve")}>O</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/solve")}>L</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/solve")}>V</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/solve")}>E</td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                    </tr>
                    <tr>{Array(16).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    <tr className="group">
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/search")}>S</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/search")}>E</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/search")}>A</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/search")}>R</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/search")}>C</td>
                        <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/search")}>H</td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                        <td className="home-grid-cell"></td>
                    </tr>
                    <tr>{Array(16).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    {!loggedInUser && (
                        <>
                            <tr className="group">
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/register")}>S</td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/register")}>I</td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/register")}>G</td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/register")}>N</td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/register")}>U</td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/register")}>P</td>
                            </tr>
                            <tr>{Array(16).fill(null).map(() => {
                                return <td className="home-grid-cell"></td>
                            })}</tr>
                            <tr className="group">
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell"></td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/login")}>L</td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/login")}>O</td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/login")}>G</td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/login")}>I</td>
                                <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={() => navigate("/login")}>N</td>
                            </tr>
                        </>
                    )}
                    <tr>{Array(16).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    <tr>{Array(16).fill(null).map(() => {
                        return <td className="home-grid-cell"></td>
                    })}</tr>
                    {loggedInUser && (
                        <tr className="group">
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell"></td>
                            <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={handleLogout}>L</td>
                            <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={handleLogout}>O</td>
                            <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={handleLogout}>G</td>
                            <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={handleLogout}>O</td>
                            <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={handleLogout}>U</td>
                            <td className="home-grid-cell clickable group-hover:bg-black group-hover:text-white" onClick={handleLogout}>T</td>
                        </tr>
                    )}
                    {Array(loggedInUser ? 2 : 1).fill(null).map(() =>
                        <tr>
                            {Array(16).fill(null).map(() => {
                                return <td className="home-grid-cell"></td>
                            })}
                        </tr>)}
                </table>
            </div>
        </>
    );
};

export default Home;
