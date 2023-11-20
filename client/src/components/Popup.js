import React from 'react'
import './Popup.css';
function Popup(props) {
    //const [trigger, setTrigger] = useState({state: true});
  return (props.trigger) ? (
    <div className='Popup'>
        <div className='popup-inner'>
            <button className='popup-close' onClick={() => props.setCardPopup(false)}>
                Close
            </button>
            {props.children}
        </div>
    </div>
  ): "";
}

export default Popup