import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig";

const LogIn = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit } = useForm();

    

    const onSubmit = async (data) => {
        const { username, password } = data;

        try {
            const q = query(collection(db, "Users"), where("UserName", "==", username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error("Invalid username or user does not exist");
            }

            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            const email = userData.Email;

            await signIn(email, password);
            navigate(location?.state || "/info");
        } catch (error) {
            console.error("Login failed:", error.message);
            alert("Invalid username or password");
        }
    };


    return (
        <div className="mx-auto my-52 w-full max-w-md space-y-8 rounded-lg border bg-white p-7 shadow-xl mobile:p-10">
            <h1 className="text-3xl font-semibold tracking-tight">SIGN IN</h1>

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
                        {...register("username", { required: true })}
                    />
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
                        {...register("password", { required: true })}
                    />
                    <div className="flex justify-end text-xs">
                        <a href="#" className="text-black hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-sky-500 px-4 py-2 mx-40 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700"
                >
                    Submit
                </button>
            </form>
            <p className="text-center text-sm text-black">
                Don&apos;t have an account?
                <NavLink to="/register" className="font-semibold underline">
                    signup
                </NavLink>
            </p>
        </div>
    );
};

export default LogIn;
