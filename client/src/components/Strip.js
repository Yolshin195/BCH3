import React from 'react';
import './Strip.css'

function Strip({list}) {
    return (
    <div className="strip">
        {
            list.map(el => <div className="">{el}</div>)
        }
    </div>
    );
}

export default Strip;
