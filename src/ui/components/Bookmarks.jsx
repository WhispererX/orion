import React from 'react'
import Tab from './Tab'

export default function Bookmarks() {
  return (
    <ul id="bookmarks">
        <Bookmark title="Gmail" icon="https://media.discordapp.net/attachments/1252576401631084554/1443594599791853720/33ba06cefabadb1744f08293ca7bccb5.png?ex=694358fd&is=6942077d&hm=227ec3e241133366dafc4a65c58572cada548dd6709c432cf90f547d2b6e47f6&=&format=webp&quality=lossless" />
    </ul>
  )
}


export function Bookmark({ title, icon }) {
  return (
    <li className={`tab bookmark`}>
        <img  className="tabIcon" src={icon} alt="" />
        <span className="tabTitle">{title}</span>
    </li>
  )
}
