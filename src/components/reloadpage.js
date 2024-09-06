import React, { useEffect } from 'react';

const ReloadPage = () => {
  useEffect(() => {
    // Set an interval to reload the page every 10 minutes (600000 milliseconds)
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 300000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {/* Your page content */} 
    </div>
  );
};

export default ReloadPage;
