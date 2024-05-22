import React, { useState, useEffect } from "react";

const parseDate = (dateString) => {
  return new Date(dateString);
};

const AutoUpdate = ({ start_date, end_date }) => {
  const [status, setStatus] = useState('scheduling');
  const startDate = parseDate(start_date);
  const endDate = parseDate(end_date);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now >= startDate && now <= endDate) {
        setStatus('running');
      } else if (now > endDate) {
        setStatus('closed');
        clearInterval(intervalId); 
      }
    }, 1000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, [startDate, endDate]);

  return (
    <div>
      <p> {status}</p>
    </div>
  );
};

export default AutoUpdate;
