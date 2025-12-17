import React from 'react'
import IconButton from './IconButton'
import { FaArrowRotateRight, FaLock, FaRegHeart, FaHeart, FaDownload, FaGear } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function AddressBar() {
  return (
    <div id="addressBar">
      <div id="navigationContainer">
        <IconButton icon={<IoIosArrowBack />} title="Back" onClick={() => window.electron.send('navigation:back')} />
        <IconButton icon={<IoIosArrowForward />} title="Forward" onClick={() => window.electron.send('navigation:forward')} />
        <IconButton icon={<FaArrowRotateRight />} title="Reload" onClick={() => window.electron.send('navigation:reload')} />
      </div>

      <div id="searchContainer">
        <FaLock id="lockIcon" />
        <input type="text" id="addressInput" placeholder="Search or enter address" />
        <IconButton icon={<FaRegHeart />} title="Add to Favorites" onClick={() => window.electron.send('favorites:add')} />
      </div>

      <div id="toolBar">
        <IconButton icon={<FaDownload />} title="Downloads" onClick={() => window.electron.send('downloads:open')} />
        <IconButton icon={<FaGear />} title="Settings" onClick={() => window.electron.send('settings:open')} />
      </div>
    </div>
  )
}
