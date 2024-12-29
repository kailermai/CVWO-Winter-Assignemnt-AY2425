import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Threads } from "./pages/Threads"
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <>
    <Navbar />
    <Container className="mb-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/threads" element={<Threads />} />
      </Routes>
    </Container>
  </>
  )
}

export default App
