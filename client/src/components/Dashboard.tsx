import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "../styles/dashboard.css"
import { getUser } from '../spotify';
import { UserData } from "../types"
import { Player } from './Player';
import Profile from './Profile';
import TopArtists from './TopArtists';
import RecentTracksContextProvider from './recentTracksContext';
import StoreProvider from "./store"
import RecentRecommendations from './RecentRecommendations';
import { Nav } from './Nav';
import RecentTracks from './RecentTracks';
import TopTracks from './TopTracks';

interface AppProps {
  access_tokenparam: string
}

export default function Dashboard({ access_tokenparam }: AppProps) {
  const [user, setUser] = useState<UserData>()
  const [showNav, setShowNav] = useState<boolean>(false)

  const getUserData = async () => {
    const data = await getUser()
    const { display_name, email, external_urls, images } = data?.data
    setUser({ name: display_name, email: email, profile: external_urls.spotify, image: images[0] })
  }

  useEffect(() => {
    getUserData()
  }, [access_tokenparam])

  return (
    <div >
      <StoreProvider>
        <RecentTracksContextProvider>
          <Profile user={user} setShowNav={setShowNav} showNav={showNav} />
          <div className='main'>
            <Router>
              <Nav showNav={showNav} setShowNav={setShowNav} />
              <div className='pages'>
                <Routes>
                  <Route path="/" element={<RecentRecommendations />} />
                  <Route path="/recentTracks" element={<RecentTracks />} />
                  <Route path="/topArtists" element={<TopArtists />} />
                  <Route path="/topTracks" element={<TopTracks />} />
                </Routes>
              </div>
            </Router>
          </div>
        </RecentTracksContextProvider>
      </StoreProvider>
      <Player />
    </div>
  );
}
