import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
    if (token) {
        if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        else delete axiosInstance.defaults.headers.common["Authorization"];
    }
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const { getToken, userId } = useAuth();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
            } catch (error) {
                updateApiToken(null);
                console.log("Error in auth provider", error);
            } finally {
                setIsLoading(false);
            }
        }
        initAuth();
    }, [getToken, userId])

    if (isLoading)
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <Loader className='size-8 text-emerald-500 animate-spin' />
            </div>
        );

    return <>{children}</>;
}



export default AuthProvider;