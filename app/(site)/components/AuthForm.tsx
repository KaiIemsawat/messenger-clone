"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialBtn from "./AuthSocialBtn";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast"; // having a popup with error message when there is an issue
import { useRouter } from "next/navigation"; // make sure import from "next/navigation"

// Declare a custom 'type'
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const session = useSession();
    const router = useRouter(); // make sure import from "next/navigation"
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === "authenticated") {
            // console.log("authenticated"); // to check if user is logged in
            router.push("/users");
        }
    }, [session?.status, router]);

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

        /* REGISTER - axios */
        if (variant === "REGISTER") {
            // "/api/register" need to match with folder structure under app folder
            axios
                .post("/api/register", data)
                .then(() => signIn("credentials", data))
                .catch(() => toast.error("Something went wrong!")) // Having a popup with error message when there is an issue
                .finally(() => setIsLoading(false)); // After an error, the screen will be reset as 'setIsLoading()' is set to false
        }

        /* LOGIN - NextAuth */
        if (variant === "LOGIN") {
            // signIn() is imported from "next-auth/react"
            // there are 3 signin options as in api/auth/[...nextauth]/route.ts

            // signIn("credentials") <-- ("credentials") came from CredentialsProvider({name: credentials})
            signIn("credentials", { ...data, redirect: false })
                .then((callback) => {
                    // if there is any issue
                    if (callback?.error) {
                        toast.error("Invalid Credentials");
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success("LOGGED IN");
                        router.push("/users");
                    }
                })
                .finally(() => setIsLoading(false)); // After an error, the screen will be reset as 'setIsLoading()' is set to false
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        // NextAuth social signin
        // signin with github or google account
        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid credentials");
                }
                if (callback?.ok && !callback?.error) {
                    toast.success("LOGGED IN");
                }
            })
            .finally(() => setIsLoading(false));
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
