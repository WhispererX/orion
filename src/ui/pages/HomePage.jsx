import React from 'react'
import Logo from '/icon.png'
import TopBar from '../components/TopBar'

export default function HomePage() {
  return (
    <main>
      <div id="logo">
        <img src={Logo} alt="Logo" width={30} height={30} />
      </div>
      <TopBar />
      <div id="sidebar"></div>
      <div id="outlet"></div>
    </main>
  )
}
