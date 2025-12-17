import React from 'react'
import { AiFillOpenAI } from "react-icons/ai";
import { FaFacebookMessenger, FaDiscord } from "react-icons/fa6";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import IconButton from './IconButton';

export default function Sidebar() {
  return (
    <ul id="sidebar">
        <li className="sidebarButton">
            <IconButton icon={<AiFillOpenAI />} title="Chat GPT" onClick={() => window.electron.send('sidebar:ai-assistant')} />
        </li>
        <li className="sidebarButton">
            <IconButton icon={<FaFacebookMessenger />} title="Messenger" onClick={() => window.electron.send('sidebar:messenger')} />
        </li>
        <li className="sidebarButton">
            <IconButton icon={<FaDiscord />} title="Discord" onClick={() => window.electron.send('sidebar:discord')} />
        </li>
        <li className="sidebarButton">
            <IconButton icon={<BsFillMusicPlayerFill />} title="Music Player" onClick={() => window.electron.send('sidebar:music-player')} />
        </li>
        <li className="sidebarButton">
            <IconButton icon={<HiDotsHorizontal />} title="More Options" onClick={() => window.electron.send('sidebar:more-options')} />
        </li>
    </ul>
  )
}
