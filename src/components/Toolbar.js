import { ipcRenderer } from "../Renderer";
import React from 'react';

import MaximizeIcon from '../assets/maximize.svg';
import MinimizeIcon from '../assets/minimize.svg';
import AdjustIcon from '../assets/adjust.svg';
import DragIcon from '../assets/drag.svg';
import CloseIcon from '../assets/close.svg';

function Toolbar(){

    const handleToolBarEvent = (type)=>{
      ipcRenderer.send('tool-bar-action', type);
    }
    
    return(
      <div className='tool-bar'>
        <button className='drag btn'><img className='icon' src={DragIcon}/></button>
        <button className='adjust btn' onClick={()=>handleToolBarEvent('adjust')}><img className='icon' src={AdjustIcon}/></button>
        <button className='minimize btn' onClick={()=>handleToolBarEvent('minimize')}><img className='icon' src={MinimizeIcon}/></button>
        <button className='maximize btn' onClick={()=>handleToolBarEvent('maximize')}><img className='icon' src={MaximizeIcon}/></button>
        <button className='close btn' onClick={()=>handleToolBarEvent('close')}><img className='icon' src={CloseIcon}/></button>
      </div>
    )
  }

export default Toolbar;