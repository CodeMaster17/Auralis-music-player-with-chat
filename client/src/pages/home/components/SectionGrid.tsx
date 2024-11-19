import { Button } from '@/components/ui/button'

const SectionGrid = ({title}) => {

    const songs = [
        {
            "_id": "61f2e4d9b3d6a1c6c0b5d6c9",
            "title": "The Way You Look Tonight",
            "artist": "Frank Sinatra",
            "albumId": "61f2e4d9b3d6a1c6c0b5d6c8",
            "imageUrl": "https://i.scdn.co/image/ab67616d0000b273f7b4c1b7a5f8f8d9f8f5b7b3",
            "audioUrl": "https://res.cloudinary.com/d"
        }
    ]
    return (
        <div className='mb-8'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
                <Button variant='link' className='text-sm text-zinc-400 hover:text-white'>
                    Show all
                </Button>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {songs.map((song) => (
                        <div
                            key={song._id}
                            className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
                        >
                            <div className='relative mb-4'>
                                <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
                                    <img
                                        src={song.imageUrl}
                                        alt={song.title}
                                        className='w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105'
                                    />
                                </div>
                                {/* <PlayButton song={song} /> */}
                            </div>
                            <h3 className='font-medium mb-2 truncate'>{song.title}</h3>
                            <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SectionGrid