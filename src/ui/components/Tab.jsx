import React from 'react'
import IconButton from './IconButton'
import { FaXmark  } from "react-icons/fa6";

export default function Tab({ title, icon }) {
  return (
    <li className="tab">
        <img  className="tabIcon" src={icon} alt="" />
        <span className="tabTitle">{title}</span>
        <IconButton icon={<FaXmark />} title="Close Tab" className="closeTabButton" onClick={() => window.electron.send('tab:close')} />
    </li>
  )
}
