
const Topbar = () => {
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
                {/* signed out button */}
                Signed Out
                {/* User icon */}
            </div>
        </div>

    )
}

export default Topbar