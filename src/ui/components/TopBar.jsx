import React from 'react'
import { FaWindowMinimize, FaWindowRestore, FaX, FaXmark, FaRegWindowMaximize  } from "react-icons/fa6";
import IconButton from '../components/IconButton';
import ContextMenu from '../components/ContextMenu';

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
            <div id="tabContainer"></div>
            <div id="windowControls">
                <IconButton icon={<FaWindowMinimize />} title="Minimize"  onClick={handleWindowMinimize} />
                <IconButton icon={<FaWindowRestore />}  title="Restore"   onClick={handleWindowRestore} />
                <IconButton icon={<FaXmark />}          title="Close"     onClick={handleWindowClose} id="windowCloseButton" />
            </div>
        </div>
    );
}
