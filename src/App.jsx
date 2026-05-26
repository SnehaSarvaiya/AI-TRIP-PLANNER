import { Button } from "./components/ui/button"
import Header from "./components/custom/Header"
import Hero from "./components/custom/Hero"

function App() {
  return (
    <div className="flex  flex-col items-top-left justify-top-left gap-4 bg-muted p-6">
      <Header />
      <Hero />
   
    </div>
  )
}

export default App