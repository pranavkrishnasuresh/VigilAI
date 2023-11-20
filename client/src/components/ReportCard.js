import React from 'react';
import { useState } from 'react';
import './ReportCard.css';
import { useHistory } from 'react-router-dom';

function ReportCard({field1, field2, field3, id}) {
    const history = useHistory();
    //const [cardPopup, setCardPopup] = useState(false);
    function handleClick() {
        history.push('/officer/reporting', {
            name: field1, date: field2, numIncident: id
        });
        window.location.reload();
    }
    return (
        <div 
        className='ReportCard'
        onClick={handleClick}>
            <h1>{field1}</h1>
            <h1>{field2}</h1>
            <h1>{field3} mistakes</h1>
        </div>
    )
}
export default ReportCard;