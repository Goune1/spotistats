import { useState, useEffect } from 'react'
import Nav from '@/components/nav'
import LoginButton from '@/components/loginButton'
// @ts-ignore
import Cookies from 'js-cookie'




export default function Hero() {
  // @ts-ignore
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState()

    useEffect(() => {
        const usernameCookie = Cookies.get('username');
        if (usernameCookie) {
          setIsLoggedIn(true);
          setUsername(usernameCookie)
        } else {
          setIsLoggedIn(false);
        }
    }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <Nav/>

      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>
      <div className="max-w-7xl pb-24 pt-10 sm:pb-32 lg:flex ml-4 px-4 lg:ml-48  lg:py-24">
        <div className=" max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          {isLoggedIn ? (
            <h1 className='mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl'>Bienvenue <span className='text-indigo-600'>{username}</span></h1>
          ) : (
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">Vos stats <span className='text-indigo-600'>Spotify</span> <br /> sont ici !</h1>
          )}
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Découvrez vos stats Spotify comme jamais auparavant, voyez vos 50 chansons et artistes préférés
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            {isLoggedIn ? (
              <a href='/top-tracks' className='bg-indigo-600 px-6 py-2 rounded-lg text-white'>Vos top</a>
            ) : (
              <LoginButton/>
            )}
            
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              En savoir plus <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="app_screenshot.png"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
