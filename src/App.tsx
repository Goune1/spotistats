import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from '@/pages/home'
import Callback from '@/pages/callback'
import TopTracks from '@/pages/topTracks'
import TopArtists from '@/pages/topArtists'
import Recommandations from '@/pages/recommandations'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },

  {
    path: '/api/auth/callback/spotify',
    element: <Callback/>
  },

  {
    path: '/top-tracks',
    element: <TopTracks/>
  },

  {
    path: '/top-artists',
    element: <TopArtists/>
  },

  {
    path: '/recommandations',
    element: <Recommandations/>
  }

])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
