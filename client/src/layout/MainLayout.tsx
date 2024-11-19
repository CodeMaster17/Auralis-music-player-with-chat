import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
const MainLayout = () => {

    // checking for mobile device
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 786)
        }
        checkMobile();
        window.addEventListener("resize", checkMobile)
        return () => window.addEventListener("resize", checkMobile)
    }, [])

    return (
        <div className='h-screen bg-black text-white flex flex-col'>
            <ResizablePanelGroup direction="horizontal" className='flex-1 flex h-full overflow-hidden p-2'>
                {/* Audio Player */}

                <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
                {/* Main content */}
                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                    <Outlet />
                </ResizablePanel>

                <ResizableHandle />
                <ResizablePanel>Two</ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default MainLayout;