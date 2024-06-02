import { useState, useEffect } from 'react';
import axios from 'axios';
//@ts-ignore
import Cookies from 'js-cookie';
import Nav from '@/components/nav'
import {CircularProgress} from "@nextui-org/progress";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface ImageInfo {
  url: string;
  height: number;
  width: number;
}

interface TrackInfo {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: ImageInfo[] };
  // Ajoutez d'autres propriétés si nécessaire
}

const Recommandations: React.FC = () => {
  //@ts-ignore
  const [topTracks, setTopTracks] = useState<TrackInfo[]>([]);
  const [serverResponse, setServerResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // État de chargement

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
          throw new Error('Access token not found in cookies');
        }
        console.log(accessToken);
        const response = await axios.get<{ items: TrackInfo[] }>(
          'https://api.spotify.com/v1/me/top/tracks',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              limit: 50,
            },
          }
        );
        const tracks = response.data.items;
        console.log('Top Tracks:', tracks);
        setTopTracks(tracks);
        sendTopTracks(tracks);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    fetchTopTracks();
  }, []);

  const sendTopTracks = async (tracks: TrackInfo[]) => {
    if (tracks.length === 0) return;

    try {
      const transformedTracks = tracks.map(track => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map(artist => artist.name),
      }));

      const sendResponse = await axios.post('https://api-spotistats.gounevps.com/api/chat', transformedTracks, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Data sent successfully:', sendResponse.data);
      const formattedResponse = formatResponse(sendResponse.data); // Formatte la réponse
      setServerResponse(formattedResponse);
      setLoading(false); // Met fin à l'état de chargement
    } catch (error) {
      console.error('Error sending top tracks:', error);
    }
  };

  const formatResponse = (data: any) => {
    let content = data.suggestions.message.content;
    // Ajoute un retour à la ligne avant chaque numéro
    content = content.replace(/(\d+\.\s)/g, '\n$1');
    // Ajoute un retour à la ligne avant le premier numéro
    content = content.replace(/^\d+\./, '\n$&');
    // Supprime les caractères de nouvelle ligne inutiles
    content = content.replace(/^\n/, '');
    return content;
  };

  return (
    <div className="min-h-screen bg-slate-900">
        <Nav/>
        <div className='pt-20 p-4'>
            <h1 className='text-white text-center text-2xl lg:text-6xl font-semibold'>Recommandations</h1>
            <p className='text-white text-center text-lg lg:text-2xl'>Voici quelques recommandations de titres personnalisés <br /> en fonction de ce que vous écoutez</p>
        </div>
      <div className="text-white"></div>
      <div className='flex items-center justify-center pt-12 p-4'>
        <Card className='dark w-custom h-custom2 lg:custom'>
            <CardHeader>
                <CardTitle>Vos recommandations</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? ( // Affiche un message de chargement si loading est vrai
                    <CircularProgress size='md'strokeWidth={4} color='primary' aria-label="Loading..." className='ml-28 mt-24 lg:mt-32 lg:ml-52'/>
                ) : (
                  <><h1 className='text-white'>{serverResponse}</h1></> // Affiche la réponse si le chargement est terminé
                )}
            </CardContent>
        </Card>
       </div>

    </div>
  );
};

export default Recommandations;
