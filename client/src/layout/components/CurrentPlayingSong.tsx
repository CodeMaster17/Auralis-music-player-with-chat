const CurrentPlayingSong = ({ imageUrl, title, artist }) => {
    return (
        <>
            <img
                src={imageUrl}
                alt={title}
                className='w-14 h-14 object-cover rounded-md'
            />
            <div className='flex-1 min-w-0'>
                <div className='font-medium truncate hover:underline cursor-pointer'>
                    {title}
                </div>
                <div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
                    {artist}
                </div>
            </div>
        </>
    )
}

export default CurrentPlayingSong