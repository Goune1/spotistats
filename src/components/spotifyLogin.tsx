// SpotifyAuth.tsx
import axios from 'axios';

interface UserInfo {
  id: string;
  displayName: string;
  email: string;
  // Ajoutez d'autres propriétés si nécessaire
}

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = 'ec41269fb4db4cb78f92e27806d1f91d';
const REDIRECT_URI = 'http://localhost:5173/api/auth/callback/spotify'; // URL de redirection après l'authentification
const SCOPE = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private ugc-image-upload  user-top-read';


export const authenticateSpotify = () => {
    const url = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&response_type=token&show_dialog=true`;
    window.location.href = url;
};

export const getAccessTokenFromUrl = () => {
    const hash = window.location.hash.substr(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
};


export const getUserInfo = async (accessToken: string): Promise<UserInfo> => {
  try {
    const response = await axios.get<UserInfo>('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
