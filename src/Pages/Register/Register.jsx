import { useForm } from "react-hook-form"
import { NavLink, useLocation, useNavigate } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import toast, { Toaster } from "react-hot-toast"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebaseConfig/firebaseConfig"
const Register = () => {
    const { createUser } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const dbref = collection(db, 'Users')
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    // Firebase collection name == Users
    const onSubmit = async (data) => {
        const { email, username, password } = data;
        const userInfo = { email, username, password };

        try {
            console.log("User Info:", userInfo);

            // Step 1: Create user in Firebase Authentication
            await createUser(email, password);

            // Step 2: Save user details in Firestore (excluding password)
            await addDoc(dbref, {
                UserName: username,
                Email: email,
                Password: password, 
            });
            console.log("User info saved in Firestore Database");

            // Step 3: Save user details in your external backend (if needed)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo), // Do not include the password in real-world applications
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const responseData = await response.json();
            if (responseData.insertedId) {
                toast.success("Registered and Stored!");
                navigate(location?.state || "/login");
            } else {
                throw new Error("Failed to insert user data into the backend");
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
            toast.error("Failed to register and store user.");
        }
    };

    return (
        <div className="mx-auto  my-56 w-full max-w-md space-y-8 rounded-lg border bg-white p-7 shadow-xl mobile:p-10  ">
            <h1 className="text-3xl font-semibold tracking-tight">SIGN UP</h1>
            <Toaster />
            {/* Form starts from here */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2 text-sm">
                    <label htmlFor="username" className="block text-black font-medium">
                        Username
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        id="username"
                        placeholder="Username"
                        type="text"
                        {...register('username', { 'required': true })}
                    />
                    {errors.username?.type === 'required' && (
                        <p className='text-red-400'>Name is required</p>
                    )}
                </div>
                <div className="space-y-2 text-sm">
                    <label htmlFor="username" className="block text-black font-medium">
                        Email
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        id="email"
                        placeholder="Enter email"
                        type="email"
                        {...register('email', { 'required': true })}
                    />
                    {errors.email?.type === 'required' && (
                        <p className='text-red-400'>Email is required</p>
                    )}
                </div>
                <div className="space-y-2 text-sm">
                    <label htmlFor="password" className="block text-black font-medium">
                        Password
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                        id="password"
                        placeholder="Enter password"
                        type="password"
                        {...register('password', { 'required': true })}
                    />
                </div>
                <div>
                <label htmlFor="password">Upload Images:</label>
                <input type="file" name="images" />
                </div>
                <button className="rounded-md bg-sky-500 px-4 py-2 text-white mx-40 transition-colors hover:bg-sky-600 dark:bg-sky-700">Submit</button>
            </form>
            <p className="text-center text-sm text-black">
                Already have an account?
                <NavLink to='/login' className="font-semibold underline">signIn</NavLink>
            </p>
        </div>
    )
}

export default Register