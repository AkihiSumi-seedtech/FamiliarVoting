import React, { useState, useEffect } from "react";

const parseDate = (dateString) => {
  return new Date(dateString);
};

const AutoUpdate = ({ start_date, end_date, initialStatus }) => {
  const [status, setStatus] = useState(() => {
    // ローカルストレージから初期状態を取得する
    const storedStatus = localStorage.getItem("status");
    return storedStatus || initialStatus;
  });

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
        // 状態をローカルストレージに保存する
        localStorage.setItem("status", "closed");
      }
      console.log(startDate);
      console.log(endDate);
      console.log(status);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startDate, endDate, status]);

  return (
    <div>
      <p>{status}</p>
    </div>
  );
};

export default AutoUpdate;
