import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router } from 'react-router'
import AddProduct from './Components/AddProduct/AddProduct'
import Home  from './Components/Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/' element={<AddProduct/>} />
    </Routes>
    </>
  )
}

export default App
