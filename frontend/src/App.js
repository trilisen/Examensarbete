import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Start from "./pages/Start"

function App() {
  return (
    <Router>
      <main className="bg-blue-400 h-screen">
        <div className="text-center text-5xl py-5 h-1/6">
          <a href="/">POLL.EM</a>
        </div>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
        </Switch>
        <footer className="h-1/6 opacity-70 flex justify-center items-end">
          Made by Jon McGarvie
        </footer>
      </main>
    </Router>
  )
}

export default App
