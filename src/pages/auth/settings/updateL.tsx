import { useState } from "react";
import { useForm } from "react-hook-form";
import { ILogin } from "../../../helpers/types";
import { METHODS, useHttpMutation } from "../../../helpers/useHttp";

export const UpdateLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
    const [message, setMessage] = useState<string | null>(null);

    const [updateLogin, error] = useHttpMutation<null, ILogin>(() => {
        setMessage("Login updated successfully!");
    });

    return (
        <form className="bg-gray-800 p-6 rounded-lg shadow-lg" 
            onSubmit={handleSubmit(data => {
                setMessage(null); 
                console.log(data)
                updateLogin("/update/login", METHODS.PATCH, data);
            })}
        > 
            <h3 className="text-xl font-semibold mb-4"> Login</h3>

            <input 
                type="password" 
                {...register("password", { required: "please fill the field" })} 
                placeholder="Password" 
                className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
            {errors.password && <p className="text-red-400">{errors.password.message}</p>}

            <input 
                type="text" 
                {...register("login", { required: "plese fill the filed" })}
                placeholder="New Login" 
                className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
            {errors.login && <p className="text-red-400">{errors.login.message}</p>}

            <button className="bg-blue-500 px-4 py-2 mt-2 rounded text-white" type="submit">
                Confirm
            </button>

            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-400 mt-2">{error}</p>}
        </form>
    );
};
