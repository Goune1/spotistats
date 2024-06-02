import { useState, useEffect } from 'react';
// @ts-ignore
import Cookies from 'js-cookie';
import Hero from '@/components/hero'


export default function Home() {

    // @ts-ignore
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const usernameCookie = Cookies.get('username');
        if (usernameCookie) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-900">
            <Hero/>
        </div> 
    )
}