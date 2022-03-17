import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import "../styles/dashboard.css"
import { getUser, token } from '../spotify';
import { track, UserData } from "../types"
import { Player } from './Player';
import Profile from './Profile';
import TopArtists from './TopArtists';
import StoreProvider from "./store"
import Store from './store';
import RecentRecommendations from './RecentRecommendations';
import GenreRecommendations from './GenreRecommendations';
import { Nav } from './Nav';
import { getTracks } from '../utils';
import RecentTracks from './RecentTracks';
import TopTracks from './TopTracks';




export default function Dashboard() {
  const [accessToken, setaccessToken] = useState<string>("");
  const [user, setUser] = useState<UserData>()
  const [showNav, setShowNav] = useState<boolean>(false)

  const getUserData = async (accessToken: string) => {
    const data = await getUser(accessToken)
    const { display_name, email, external_urls, images } = data?.data
    setUser({ name: display_name, email: email, profile: external_urls.spotify, image: images[0] })
  }

  useEffect(() => {
    setaccessToken(token!)
  }, [])

  useEffect(() => {
    getUserData(accessToken)
  }, [accessToken])

  useEffect(() => {
    console.log(showNav);
  }, [showNav])
  return (
    <div >
      <StoreProvider>
        <Profile user={user} setShowNav={setShowNav} showNav={showNav} />
        <div className='main'>
          <Router>
            <Nav showNav={showNav} setShowNav={setShowNav} />
            <div className='pages'>
              <Routes>
                <Route path="/" element={<RecentRecommendations accessToken={accessToken} />} />
                <Route path="/topArtists" element={<TopArtists />} />
                <Route path="/topTracks" element={<TopTracks />} />
                <Route path="/recentTracks" element={<RecentTracks accessToken={accessToken} />} />
              </Routes>
            </div>
          </Router>
        </div>
        <Player accessToken={accessToken} />
      </StoreProvider>
    </div>
  );
}
