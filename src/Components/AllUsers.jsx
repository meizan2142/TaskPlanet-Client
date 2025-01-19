import { useEffect, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { NavLink } from "react-router"

const AllUsers = () => {
    const [newUser, setNewUser] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/allusers`)
            .then(res => res.json())
            .then(data => setNewUser(data))
    }, [])
    return (
        <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50 space-y-3">
            <NavLink to='/'><FaArrowLeftLong color="black" size={20} /></NavLink>
            <h2 className="mb-3 text-2xl font-semibold leading-tight">AllUsers</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <thead className="rounded-t-lg dark:bg-gray-300">
                        <tr className="text-right">
                            <th title="Ranking" className="p-3 text-left">Name</th>
                            <th title="Team name" className="p-3 text-left">Social Media Handle</th>
                            <th title="Wins" className="p-3">Uploaded Images</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newUser.map((user) => <tr key={user._id} className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100">
                                <td className="px-3 py-2 text-left">
                                    <span>{user.username}</span>
                                </td>
                                <td className="px-3 py-2 text-left">
                                    <span>{user.social}</span>
                                </td>
                                <td className="px-3 py-2">
                                    <span className="flex items-center">
                                        {user.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.url} // Replace with your image URL property
                                                alt={`${index + 1}`}
                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                            />
                                        ))}
                                    </span>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllUsers