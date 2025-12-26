import Editor from "../components/editor"

export default function Home() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Editor</h1>
                <div className="border rounded-lg p-4">
                    <Editor />
                </div>
            </div>
        </div>
    )
}