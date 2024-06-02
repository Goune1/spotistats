import React, { useEffect } from 'react';
import { getAccessTokenFromUrl, getUserInfo } from '@/components/spotifyLogin';
// @ts-ignore
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';



const CallbackPage: React.FC = () => {

  const naviguate = useNavigate()

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const userInfo = await getUserInfo(accessToken);

      // @ts-ignore
      const username = userInfo.display_name;
      const email = userInfo.email;
      const id = userInfo.id;
      // @ts-ignore
      const pp = userInfo.images[1]?.url;

      console.log(username, email, id , pp);
      
      Cookies.set('username', username);
      Cookies.set('email', email);
      Cookies.set('id', id);
      Cookies.set('pp', pp || ''); 
      Cookies.set('access_token', accessToken)

      naviguate('/');
      
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromUrl();
    if (accessToken) {
      fetchUserInfo(accessToken);
    } else {
      console.error('Access Token not found in URL');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
        <div className="text-center">
            
        </div>
    </div>
  );
};

export default CallbackPage;
