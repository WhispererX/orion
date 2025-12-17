import React from 'react'
import { FaWindowMinimize, FaWindowRestore, FaSquarePlus, FaXmark  } from "react-icons/fa6";
import IconButton from '../components/IconButton';
import Tab from './Tab';

export default function TopBar() {
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
        <div id="topbar">
            <div id="tabContainer">
                <ul id="tabs">
                    <Tab title="New Tab" icon="https://media.discordapp.net/attachments/1252576401631084554/1443594599791853720/33ba06cefabadb1744f08293ca7bccb5.png?ex=694358fd&is=6942077d&hm=227ec3e241133366dafc4a65c58572cada548dd6709c432cf90f547d2b6e47f6&=&format=webp&quality=lossless" />
                    <Tab title="New Tab" icon="https://media.discordapp.net/attachments/1252576401631084554/1443594599791853720/33ba06cefabadb1744f08293ca7bccb5.png?ex=694358fd&is=6942077d&hm=227ec3e241133366dafc4a65c58572cada548dd6709c432cf90f547d2b6e47f6&=&format=webp&quality=lossless" />
                    <Tab title="New Tab" icon="https://media.discordapp.net/attachments/1252576401631084554/1443594599791853720/33ba06cefabadb1744f08293ca7bccb5.png?ex=694358fd&is=6942077d&hm=227ec3e241133366dafc4a65c58572cada548dd6709c432cf90f547d2b6e47f6&=&format=webp&quality=lossless" />
                    <Tab title="New Tab" icon="https://media.discordapp.net/attachments/1252576401631084554/1443594599791853720/33ba06cefabadb1744f08293ca7bccb5.png?ex=694358fd&is=6942077d&hm=227ec3e241133366dafc4a65c58572cada548dd6709c432cf90f547d2b6e47f6&=&format=webp&quality=lossless" />
                    <Tab title="New Tab" icon="https://media.discordapp.net/attachments/1252576401631084554/1443594599791853720/33ba06cefabadb1744f08293ca7bccb5.png?ex=694358fd&is=6942077d&hm=227ec3e241133366dafc4a65c58572cada548dd6709c432cf90f547d2b6e47f6&=&format=webp&quality=lossless" />
                    <Tab title="New Tab" icon="https://media.discordapp.net/attachments/1252576401631084554/1443594599791853720/33ba06cefabadb1744f08293ca7bccb5.png?ex=694358fd&is=6942077d&hm=227ec3e241133366dafc4a65c58572cada548dd6709c432cf90f547d2b6e47f6&=&format=webp&quality=lossless" />
                    <Tab title="New Tab" icon="https://media.discordapp.net/attachments/1252576401631084554/1443594599791853720/33ba06cefabadb1744f08293ca7bccb5.png?ex=694358fd&is=6942077d&hm=227ec3e241133366dafc4a65c58572cada548dd6709c432cf90f547d2b6e47f6&=&format=webp&quality=lossless" />
                </ul>
                <IconButton icon={<FaSquarePlus />} title="New Tab" className='addTabButton' onClick={() => window.electron.send('tab:new')} />    
            </div>
            <div id="windowControls">
                <IconButton icon={<FaWindowMinimize />} title="Minimize"  onClick={handleWindowMinimize} />
                <IconButton icon={<FaWindowRestore />}  title="Restore"   onClick={handleWindowRestore} />
                <IconButton icon={<FaXmark />}          title="Close"     onClick={handleWindowClose} id="windowCloseButton" />
            </div>
        </div>
    );
}
