import React, { useState, useEffect } from "react";
import axios from 'axios';

const parseDate = (dateString) => {
  return new Date(dateString);
};

const AutoUpdate = ({ start_date, end_date, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);

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
        updateStatus('running'); // 状態をバックエンドに送信
      } else if (now > endDate && status === "running") {
        setStatus('closed');
        updateStatus('closed'); // 状態をバックエンドに送信
        clearInterval(intervalId);
      }
      console.log(startDate)
      console.log(endDate)
      console.log(status)
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [status]);

  const updateStatus = async (newStatus) => {
    try {
      const response = await axios.post('/api/update_election_status', { newStatus });
      console.log(response.data); // 応答をログに記録
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <p> {status}</p>
    </div>
  );
};

export default AutoUpdate;
