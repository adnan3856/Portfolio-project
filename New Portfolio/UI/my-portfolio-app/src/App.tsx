import { Navbar } from "@/Navbar";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />
      
      <main className="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Build Your <span className="text-primary">Portfolio</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          This is a test page to verify that Tailwind CSS, Shadcn UI, and path aliases are all working perfectly together in your Vite React project.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">View Projects</Button>
        </div>
      </main>
    </div>
  )
}

export default App
