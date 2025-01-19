import { NavLink, useLocation, useNavigate } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import { Avatar, Menu, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { auth } from "../../firebaseConfig/firebaseConfig"
const Home = () => {
    const { user, logOut } = useAuth()
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const open = Boolean(anchorEl);
    const [currentUser, setCurrentUser] = useState([])

    // Handle opening the dropdown
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle closing the dropdown
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = async () => {
        try {
            await logOut(auth);
            navigate(location?.state ? location?.state : '/login')
        } catch (err) {
            console.error('Error signing out:', err);
        }
    };
    useEffect(() => {
        if (user?.email) {
            fetch(`${import.meta.env.VITE_API_URL}/allusers/${user.email}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => setCurrentUser(data))
                .catch((error) => console.error("Error fetching user data:", error));
        }
    }, [user?.email]);
    return (
        <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
            <div className="container flex justify-between items-center h-16 mx-auto">
                <h1 className="font-bold text-black text-2xl"><NavLink>TaskPlanet</NavLink></h1>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    {
                        user ?
                            <>
                                {
                                    currentUser.role === 'admin' ?
                                        <>
                                            <li className="flex">
                                                <NavLink to='/' className="flex items-center px-4 -mb-1">Home</NavLink>
                                            </li>
                                            <li className="flex">
                                                <NavLink to='/dashboard' className="flex items-center px-4 -mb-1">Dashboard</NavLink>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className="flex">
                                                <NavLink to='/' className="flex items-center px-4 -mb-1">Home</NavLink>
                                            </li>
                                        </>
                                }
                            </>
                            :
                            <>
                                <li className="flex">
                                    <a rel="noopener noreferrer" className="flex items-center px-4 -mb-1">Home</a>
                                </li>
                            </>
                    }
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex gap-4">
                    {
                        user ?
                            <div>
                                {/* Avatar component */}
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://i.ibb.co.com/ySq52d2/Whats-App-Image-2024-12-15-at-17-19-01-f2263a6f.jpg"
                                    sx={{ width: 56, height: 56, cursor: "pointer" }}
                                    onClick={handleClick} // Open the dropdown when clicked
                                />

                                {/* Dropdown Menu */}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    className="text-center"
                                >
                                    {/* Dropdown items */}
                                    {
                                        currentUser.role === 'user' ?
                                            <div className="my-3 space-y-3 mx-2">
                                                <p className="font-bold">Role: {currentUser.role}</p>
                                                <p className="font-bold">Username: {currentUser.username}</p>
                                                <button onClick={handleSignOut} className="rounded-lg bg-violet-600  px-2 py-1 text-xl text-white duration-300 active:scale-95">LogOut</button>
                                            </div>
                                            :
                                            <>
                                                <MenuItem>
                                                    <NavLink to='/dashboard'>
                                                        <button className="rounded-lg bg-green-500  px-2 py-1 text-xl text-white duration-300 active:scale-95">Dashboard</button>
                                                    </NavLink>
                                                </MenuItem>
                                                <button onClick={handleSignOut} className="rounded-lg bg-violet-600  px-2 py-1 text-xl text-white duration-300 active:scale-95">LogOut</button>
                                                <p>{currentUser.role}</p>
                                            </>
                                    }
                                </Menu>
                            </div>
                            :
                            <>
                                <NavLink to='/register'><button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">SignUp</button></NavLink>
                                <NavLink to='/login'><button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50">SignIn</button></NavLink>
                            </>
                    }
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Home
