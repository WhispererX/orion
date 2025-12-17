import React from 'react'
import Logo from '/icon.png'

import { FaWindowMinimize, FaWindowRestore, FaXmark } from "react-icons/fa6";
import IconButton from '../components/IconButton';

export default function HomePage() {

  //#region Window Control Handlers
  const handleWindowMinimize = () => {
    window.electron.send('window:minimize');
  };

  const handleWindowRestore = () => {
    window.electron.send('window:restore');
  }

  const handleWindowClose = () => {
    window.electron.send('window:close');
  }
  //#endregion

  return (
    <main>
      <div id="logo">
        <img src={Logo} alt="Logo" width={30} height={30} />
      </div>
      <div id="topbar">
        <div id="tabContainer"></div>
        <div id="windowControls">
          <IconButton icon={<FaWindowMinimize />} title="Minimize"  onClick={handleWindowMinimize} />
          <IconButton icon={<FaWindowRestore />}  title="Restore"   onClick={handleWindowRestore} />
          <IconButton icon={<FaXmark />}          title="Close"     onClick={handleWindowClose} id="windowCloseButton" />
        </div>
      </div>
      <div id="sidebar"></div>
      <div id="outlet"></div>
    </main>
  )
}
