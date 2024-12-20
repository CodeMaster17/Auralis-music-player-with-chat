import { Button } from "@/components/ui/button"
import { Slider } from "@radix-ui/react-slider";
import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react"

const PlayerControls = () => {

    const isPlaying = true;

    return (
        <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
            <div className='flex items-center gap-4 sm:gap-6'>
                <Button
                    size='icon'
                    variant='ghost'
                    className='hidden sm:inline-flex hover:text-white text-zinc-400'
                >
                    <Shuffle className='h-4 w-4' />
                </Button>

                {/* FIXME: Add onclick to play previous song */}
                {/* FIXME : make it disabled when the current song is playing */}
                <Button
                    size='icon'
                    variant='ghost'
                    className='hover:text-white text-zinc-400'
                >
                    <SkipBack className='h-4 w-4' />
                </Button>

                {/* play pause button */}
                <Button
                    size='icon'
                    className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
                >
                    {isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
                </Button>

                {/* forward Button */}
                <Button
                    size='icon'
                    variant='ghost'
                    className='hover:text-white text-zinc-400'
                >
                    <SkipForward className='h-4 w-4' />
                </Button>

                {/* repeat button */}
                <Button
                    size='icon'
                    variant='ghost'
                    className='hidden sm:inline-flex hover:text-white text-zinc-400'
                >
                    <Repeat className='h-4 w-4' />
                </Button>

                {/* slider for song */}
                <div className='hidden sm:flex items-center gap-2 w-full'>
                    <div className='text-xs text-zinc-400'>2:50</div>
                    <Slider
                        // value={[currentTime]}
                        value={[50]}
                        max={100}
                        step={1}
                        className='w-full hover:cursor-grab active:cursor-grabbing'
                    // onValueChange={handleSeek}
                    />
                    <div className='text-xs text-zinc-400'>23:50</div>
                </div>
            </div>
        </div>
    )
}

export default PlayerControls