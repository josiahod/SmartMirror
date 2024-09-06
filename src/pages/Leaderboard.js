import React from 'react';
import { useState, useEffect } from "react";
import LeaderTable from "../components/table";
import SleepTable from "../components/sleeptable";
import ProgressBar from "@ramonak/react-progress-bar";



const Leaderboard = () => {
    const [stepsArr, setStepsArr] = useState([]);
    const [sleepData, setSleep] = useState({});


    const getSteps = async () => {
        try {
          const response = await fetch('http://localhost:8080/addSteps');
          if (!response.ok) {
            throw new Error('Failed to fetch auth URL');
          }
          const data = await response.json();
          console.log(data.data); 
          setStepsArr(data.data);
  
        } catch (error) {
          console.error('Failed to fetch auth URL:', error);
        }
      };

      const getsleep = async () => {
        try {
          const response = await fetch('http://localhost:8080/sleep');
          if (!response.ok) {
            throw new Error('Failed to fetch auth URL');
          }
          const data = await response.json();
          console.log(data.sleepdata); 
          setSleep(data.sleepdata);
  
        } catch (error) {
          console.error('Failed to fetch auth URL:', error);
        }
      };

      useEffect(() => {
        getSteps();
        getsleep();
      }, []);

  return (
    <div>
        <h1 style={{ textAlign: 'center' }}>Leaderboard</h1>
       {stepsArr.length > 0 ? <LeaderTable data={stepsArr}/> : <h2 style={{ textAlign: 'center' }}>Loading...</h2>}
       <h2 style={{ textAlign: 'center' }}>Steps To 20K</h2>
       <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
       {stepsArr.length > 0 &&
        stepsArr.map((item, index) => (
            <div>
             <h3> {stepsArr[index].name} steps left: {20000-stepsArr[index].steps} </h3> 
          <ProgressBar
            key={index}
            completed={Math.ceil((item.steps / 20000) * 100)}
            bgColor={'#000000'}
          />
            </div>
        ))}
         </div>
         <div> 
         <h2 style={{ textAlign: 'center' }}>Sleep Data</h2>
         {Object.keys(sleepData).length > 0 ? <SleepTable sleepData={sleepData}/> : <h2 style={{ textAlign: 'center' }}>Loading...</h2>}
         </div>
       
    </div>
  )
}
export default Leaderboard