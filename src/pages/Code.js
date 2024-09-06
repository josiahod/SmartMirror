import React from 'react';
import {useEffect } from "react";


const Code = () => {

    const getAuthCode = async () => {
        try {
            const param = new URLSearchParams(window.location.search);
            const paramValue = param.get('code');
          const response = await fetch('http://localhost:8080/authcode', {
            headers: 
            {
                'codevalue' : paramValue
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch auth URL');
          }
          const data = await response.json();
          console.log(data.authcode); 
          window.location.href = '/Leaderboard';

  
        } catch (error) {
          console.error('Failed to fetch auth URL:', error);
        }
      };

      useEffect(() => {
        getAuthCode();
      }, []);
   
  return (
    <div>
      <h1>
        Getting Data - Please Wait!
      </h1>
    </div>
  )
}

export default Code