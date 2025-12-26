"use client";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../components/editor"), {
    ssr: false,
});

export default function Home() {
    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Brutalist header with asymmetric design */}
                <div className="mb-8 md:mb-12">
                    <div className="bg-surface brutal-border brutal-shadow p-6 md:p-8 mb-4">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2">
                            ✏️ KAMI
                        </h1>
                        <p className="text-lg md:text-xl font-mono text-foreground/70">
                            紙 / paper — instant markdown sharing
                        </p>
                    </div>
                    
                    {/* Brutalist accent bar */}
                    <div className="bg-accent h-2 md:h-3 w-3/4 ml-auto brutal-border"></div>
                </div>

                {/* Editor container with brutalist styling */}
                <div className="bg-surface brutal-border-heavy brutal-shadow-lg p-6 md:p-8">
                    <div className="mb-4 pb-4 border-b-[3px] border-border">
                        <p className="font-mono text-sm md:text-base font-bold uppercase tracking-wider">
                            Start Typing Below
                        </p>
                    </div>
                    <Editor />
                </div>

                {/* Footer info */}
                <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="bg-muted brutal-border px-4 py-2 font-mono text-xs md:text-sm">
                        Your notes are saved in the URL
                    </div>
                    <div className="bg-accent brutal-border px-4 py-2 font-mono text-xs md:text-sm font-bold">
                        Share the link to share your notes
                    </div>
                </div>
            </div>
        </div>
    )
}