// import { useLocation, useNavigate } from "react-router";
// import { useAuth } from "../../hooks/useAuth"
// import { useEffect, useState } from "react";
// import { auth } from "../../firebaseConfig/firebaseConfig";

const Info = () => {
    // const { logOut, user } = useAuth()
    // const [newUser, setNewUser] = useState([])
    // const navigate = useNavigate()
    // const location = useLocation()
    // const handleSignOut = async () => {
    //     try {
    //         await logOut(auth);
    //         navigate(location?.state ? location?.state : '/login')
    //     } catch (err) {
    //         console.error('Error signing out:', err);
    //     }
    // };
    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => setNewUser(data))
    // }, [user?.email])
    // console.log(newUser);
    
    return (
        <div className="flex my-56 justify-center">
            <div className="w-[350px] rounded-2xl bg-white p-6 shadow-lg dark:bg-[#18181B] md:p-8">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <h1 className="text-white font-bold text-3xl">Your Info</h1>
                    {/* <h1 className="text-center font-medium text-slate-700 dark:text-white/80">Username: {newUser.username}</h1> */}
                    {/* <h1 className="text-center font-medium text-slate-700 dark:text-white/80">Email: {user.email}</h1> */}
                    {/* <button onClick={handleSignOut} className="rounded-lg bg-sky-500 px-4 py-2 text-xl text-white duration-300 active:scale-95">SignOut</button> */}
                </div>
            </div>
        </div>
    )
}

export default Info