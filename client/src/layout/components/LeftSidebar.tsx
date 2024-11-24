import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
const LeftSidebar = () => {

    const isLoading = true;
    const albums = [
        {
            "_id": "1",
            "title": "Album title",
            "artist": "Album Artist",
            "imageUrl": "https://i.scdn.co/image/ab67616d0000b273f7b4c1b7a5f8f8d9f8f5b7b3",
            "releaseYear": 2004,
            "songs": [
                {
                    "_id": "61f2e4d9b3d6a1c6c0b5d6c9",
                    "title": "The Way You Look Tonight",
                    "artist": "Frank Sinatra",
                    "albumId": "61f2e4d9b3d6a1c6c0b5d6c8",
                    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273f7b4c1b7a5f8f8d9f8f5b7b3",
                    "audioUrl": "https://res.cloudinary.com/d"
                }
            ]
        }
    ]
    return (
        <div className='rounded-lg bg-zinc-900 p-4'>
            <div className='space-y-2'>
                <Link
                    to={"/"}
                    className={cn(
                        buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800",
                        })
                    )}
                >
                    <HomeIcon className='mr-2 size-5' />
                    <span className='hidden md:inline'>Home</span>
                </Link>


                <Link
                    to={"/chat"}
                    className={cn(
                        buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800",
                        })
                    )}
                >
                    <MessageCircle className='mr-2 size-5' />
                    <span className='hidden md:inline'>Messages</span>
                </Link>
                {/* library section */}
            </div>

            {/*library section */}
            <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center text-white px-2'>
                        <Library className='size-5 mr-2' />
                        <span className='hidden md:inline'>Playlists</span>
                    </div>
                </div>

                <ScrollArea className='h-[calc(100vh-300px)]'>
                    <div className='space-y-2'>
                        {isLoading ? (
                            <PlaylistSkeleton />
                        ) : (
                            albums.map((album) => (
                                <Link
                                    to={`/albums/${album._id}`}
                                    key={album._id}
                                    className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer'
                                >
                                    <img
                                        src={album.imageUrl}
                                        alt='Playlist img'
                                        className='size-12 rounded-md flex-shrink-0 object-cover'
                                    />

                                    <div className='flex-1 min-w-0 hidden md:block'>
                                        <p className='font-medium truncate'>{album.title}</p>
                                        <p className='text-sm text-zinc-400 truncate'>Album • {album.artist}</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>

            </div>
        </div>
    )
}

export default LeftSidebar