import React, { useState, useEffect } from "react";

const parseDate = (dateString) => {
  return new Date(dateString);
};


const AutoUpdate = ({ start_date, end_date, initialStatus }) => { // initialStatus を追加
  const [status, setStatus] = useState(initialStatus); // Propsから初期値を受け取る

  const startDate = isValidDate(start_date) ? parseDate(start_date) : null;
const endDate = isValidDate(end_date) ? parseDate(end_date) : null;

function isValidDate(dateString) {
  const isValid = !isNaN(Date.parse(dateString));
  console.log(`Date: ${dateString}, Valid: ${isValid}`);
  return isValid;
}

  



  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now >= startDate && now <= endDate && status === "scheduling") {
        setStatus('running');
      } else if (now > endDate && status === "running") {
        setStatus('closed');
        clearInterval(intervalId); 
      }
      // console.log(now);
      console.log(startDate);
      console.log(endDate);
      console.log(status);
    },1000); 
    //↑実際の実装時には頻度の修正が必要

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
