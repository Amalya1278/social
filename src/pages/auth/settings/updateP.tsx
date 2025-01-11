import { useState } from "react";
import { useForm } from "react-hook-form";
import { METHODS, useHttpMutation } from "../../../helpers/useHttp";
import { IPassword } from "../../../helpers/types";

export const UpdatePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IPassword>();
    const [message, setMessage] = useState<string | null>(null);

    const [updatePassword, error] = useHttpMutation<null, IPassword>(() => {
        setMessage("Password updated successfully!");
    });

    return (
        <form className="bg-gray-800 p-6 rounded-lg shadow-lg" 
            onSubmit={handleSubmit(data => {
                setMessage(null);
                console.log(data);
                updatePassword("/update/password", METHODS.PATCH, data);
            })}
        >
            <h3 className="text-xl font-semibold mb-4">Password</h3>
           <input 
                type="password" 
                {...register("old", { required: "please fill the field" })} 
                placeholder="Current Password"
                className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
            {errors.old && <p className="text-red-400">{errors.old.message}</p>}

            <input 
                type="password" 
                {...register("newpwd", { required: "Please fill the field" ,minLength: {
                    value: 6,
                    message: "password is too short"
                }})}
                placeholder="New Password"
                className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
            {errors.newpwd && <p className="text-red-400">{errors.newpwd.message}</p>}

            <button className="bg-blue-500 px-4 py-2 mt-2 rounded text-white" type="submit">
                Confirm
            </button>

            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-400 mt-2">{error}</p>}
        </form>
    );
};
