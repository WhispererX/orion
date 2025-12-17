import React from 'react'
import Logo from '/icon.png'
import TopBar from '../components/TopBar'
import AddressBar from '../components/AddressBar'
import Bookmarks from '../components/Bookmarks'
import Sidebar from '../components/Sidebar'

export default function HomePage() {
  return (
    <main>
      <div id="logo">
        <img src={Logo} alt="Logo" width={30} height={30} />
      </div>
      <TopBar />
      <Sidebar />
      <div id="main">
        <AddressBar />
        <Bookmarks />
      </div>
    </main>
  )
}
