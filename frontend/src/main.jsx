import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Rooms from './components/Room/Rooms.jsx'
import HabitRoom from './components/Room/HabitRoom.jsx'
import Store from './components/Store/Store.jsx'
import Auth from './components/Auth.jsx'
import NotFound from './components/NotFound.jsx'

import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router'

import Layout from './components/Layout.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar/>
        <Toaster position="top-center" />
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/rooms' element={<Rooms/>}/>
            <Route path='/room/:id' element={<HabitRoom/>}/>
            <Route path='/store' element={<Store/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
