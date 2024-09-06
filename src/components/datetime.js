import React from 'react';
import Clock from 'react-live-clock';


  
const datetime  = () => {
    return (
        <div style={{ textAlign: 'left' }}>
        <h1 style={{ fontSize: '3.2em', marginBottom: "0px", marginTop: "0px"}}>
            <Clock
                    format={'hh:mm:ss A'}
                    ticking={true}
                timezone={'US/Eastern'} 
            />
        </h1>
        <h2 style={{ fontSize: '1.8em', marginTop: '0px' }}>
            <Clock 
                format={'dddd, MMMM D'} 
                ticking={true}
            />
        </h2>
    </div>
);
};
  
  export default datetime;