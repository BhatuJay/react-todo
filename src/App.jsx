import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Tododetail } from './components/Tododetail'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { RootLayout } from './components/RootLayout'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Modal } from './components/Model'
import { ProtectedRoute } from './pages/ProtectedRoute'
import { Analytics } from '@vercel/analytics/react'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><RootLayout /></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/alltodos",
        element: <Services />
      },
      {
        path: "/tododetail",
        element: <Tododetail />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/model",
    element: <Modal />
  }
])

function App() {
  return (
    <>
    <RouterProvider router={routes} />
    <Analytics />
    </>
  )
}

export default App
