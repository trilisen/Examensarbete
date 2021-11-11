import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Start from "./pages/Start.jsx"
import Poll from "./pages/Poll.jsx"

function App() {
  return (
    <Router>
      <div className="min-h-full">
        <main className="flex flex-col">
          <div className="text-center text-5xl py-5 h-1/6">
            <a href="/">POLL.EM</a>
          </div>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="poll/:pollId" element={<Poll />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
