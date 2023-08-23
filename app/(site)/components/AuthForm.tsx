"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import axios from "axios";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialBtn from "./AuthSocialBtn";
import { BsGithub, BsGoogle } from "react-icons/bs";

// Declare a custom 'type'
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === "REGISTER") {
            // Axios Register
            // "/api/register" need to match with folder structure under app folder
            axios.post("/api/register", data);
        }

        if (variant === "LOGIN") {
            // NextAuth Signin
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        // NextAuth social signin
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && (
                        <Input
                            id="name"
                            label="name"
                            register={register}
                            errors={errors}
                            disable={isLoading}
                        />
                    )}
                    <Input
                        id="email"
                        label="Email address"
                        type="email"
                        register={register}
                        errors={errors}
                        disable={isLoading}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disable={isLoading}
                    />
                    <div>
                        <Button disable={isLoading} fullWidth type="submit">
                            {variant === "LOGIN" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        {/* Use absolute to keep the line in absolute position */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialBtn
                            icon={BsGithub}
                            onClick={() => socialAction("github")}
                        />
                        <AuthSocialBtn
                            icon={BsGoogle}
                            onClick={() => socialAction("google")}
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === "LOGIN"
                            ? "New to Messenger?"
                            : "Already have an account?"}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === "LOGIN" ? "Create an account" : "Login"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
