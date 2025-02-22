import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return <h1>Home Page</h1>
}

function About() {
  return <h1>About Page</h1>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <Link className="btn btn-primary me-2" to="/">Home</Link>
        <Link className="btn btn-secondary" to="/about">About</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
