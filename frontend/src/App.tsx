import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Threads } from "./pages/Threads"
import { Navbar } from "./components/Navbar"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { useEffect, useState } from "react"


function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    (
      async () => {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: { 'Content-type': 'application/json' },
          credentials: 'include',
        });

        const content = await response.json();
        setName(content.name);
      }
    )();
  });

  return (
    <>
      <Navbar name={name} setName={setName}/>
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home name={name} />}/>
          <Route path="/threads" element={<Threads />} />
          <Route path="/login" element={<Login setName={setName} />}/>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
