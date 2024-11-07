import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
const MainLayout = () => {
    return (
        <div className='h-screen bg-black text-white flex flex-col'>
            <ResizablePanelGroup direction="horizontal" className='flex-1 flex h-full overflow-hidden p-2'>
                {/* Audio Player */}
                
                <ResizablePanel>One</ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>Two</ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default MainLayout;