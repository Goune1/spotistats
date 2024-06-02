import React, { useEffect, useState } from 'react';
// @ts-ignore
import Cookies from 'js-cookie';
import axios from 'axios';
import Nav from '@/components/nav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ImageInfo {
  url: string;
  height: number;
  width: number;
}

export interface TrackInfo {
  id: string;
  name: string;
  artists: { name: string }[];
  images: ImageInfo[];
}

const TopArtists: React.FC = () => {
  const [topTracks, setTopTracks] = useState<TrackInfo[]>([]);
  const [timeRange, setTimeRange] = useState<string>('short_term');

  const fetchTopTracks = async (timeRange: string) => {
    try {
      const accessToken = Cookies.get('access_token');
      if (!accessToken) {
        throw new Error('Access token not found in cookies');
      }
      console.log(accessToken);
      const response = await axios.get<{ items: TrackInfo[] }>(
        'https://api.spotify.com/v1/me/top/artists',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: 50,
            time_range: timeRange,
          },
        }
      );
      const tracks = response.data.items;
      console.log('Top Artists:', tracks);
      setTopTracks(tracks);
    } catch (error) {
      console.error('Error fetching top artists:', error);
    }
  };

  useEffect(() => {
    fetchTopTracks(timeRange);
  }, [timeRange]);

  return (
    <div className="min-h-screen bg-slate-900">
      <Nav />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-white text-center text-2xl lg:text-6xl font-semibold p-4">
          Vos artistes préférés :
        </h2>
        <Tabs defaultValue="short_term" className="w-full mt-24 dark" onValueChange={(value) => setTimeRange(value)}>
          <div className="flex items-center justify-center">
            <TabsList className="">
              <TabsTrigger value="short_term">1 mois</TabsTrigger>
              <TabsTrigger value="medium_term">6 mois</TabsTrigger>
              <TabsTrigger value="long_term">Depuis toujours</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="short_term">
            <div className="mt-12">
              <ul className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-4 mt-24 text-white ml-8 md:ml-48 lg:ml-72">
                {topTracks.map((track, index) => (
                  <li key={track.id}>
                    <img src={track.images[0].url} alt={track.name} width="50" height="50" />
                    <p>{index + 1}. {track.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="medium_term">
            <div className="mt-12">
            <ul className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-4 mt-24 text-white ml-8 md:ml-48 lg:ml-72">
                {topTracks.map((track, index) => (
                  <li key={track.id}>
                    <img src={track.images[0].url} alt={track.name} width="50" height="50" />
                    <p>{index + 1}. {track.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="long_term">
            <div className="mt-12">
              <ul className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-4 mt-24 text-white ml-8 md:ml-48 lg:ml-72">
                {topTracks.map((track, index) => (
                  <li key={track.id}>
                    <img src={track.images[0].url} alt={track.name} width="50" height="50" />
                    <p>{index + 1}. {track.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TopArtists;
