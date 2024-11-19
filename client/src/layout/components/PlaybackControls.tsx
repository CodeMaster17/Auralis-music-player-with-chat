import CurrentPlayingSong from "./CurrentPlayingSong"

const PlayBackControls = () => {
    return (
        <footer className='h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4'>
            <div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>

                {/* FIXME: Show only when current song is playing */}
                <CurrentPlayingSong
                    imageUrl={""}
                    title="Song title"
                    artist="Song artist"
                />
            </div>
        </footer>

    )
}

export default PlayBackControls