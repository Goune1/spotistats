// LoginButton.tsx
import React, { useEffect } from 'react';
import { authenticateSpotify, getAccessTokenFromUrl, getUserInfo } from './spotifyLogin';

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    authenticateSpotify();
  };

  useEffect(() => {
    const handleRedirect = async () => {
      const accessToken = getAccessTokenFromUrl();
      if (accessToken) {
        try {
          const userInfo = await getUserInfo(accessToken);
          console.log('User Info:', userInfo);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };
    handleRedirect(); // Appel de la fonction dans l'effet secondaire
  }, []); // Utilisation de la dépendance vide pour exécuter une seule fois

  return (
    <div>
      <button onClick={handleLogin} className="bg-indigo-600 px-6 py-2 rounded-lg text-white">Se connecter</button>
    </div>
  );
};

export default LoginButton;
