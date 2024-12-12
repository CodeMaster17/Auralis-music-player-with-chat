import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "@/components/SignInOAuthButtons";

const Topbar = () => {
    const isAdmin = false;
    return (
        <div
            className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    '
        >
            <div className='flex gap-2 items-center'>
                <img src='/spotify.png' className='size-8' alt='Spotify logo' />
                Spotify
            </div>
            <div className='flex items-center gap-4'>
                {/* admin dashboard button */}
                {isAdmin && (
                    <Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
                        <LayoutDashboardIcon className='size-4  mr-2' />
                        Admin Dashboard
                    </Link>
                )}
                {/* signed out button */}
                <SignedOut>
                    <SignInOAuthButtons />
                </SignedOut>

                {/* User icon */}
                <UserButton />
            </div>
        </div>

    )
}

export default Topbar