import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const parseDate = (dateString) => {
  return new Date(dateString);
};

const AutoUpdate = ({ start_date, end_date, initialStatus, electionId }) => {
  const {post} = useForm()
  const [status, setStatus] = useState(initialStatus);

  const startDate = isValidDate(start_date) ? parseDate(start_date) : null;
  const endDate = isValidDate(end_date) ? parseDate(end_date) : null;

  function isValidDate(dateString) {
    const isValid = !isNaN(Date.parse(dateString));
    console.log(`Date: ${dateString}, Valid: ${isValid}`);
    return isValid;
  }

  const handleUpdateElectionStatus = async (electionId, status) => {
    // 追加
    const data = {
      status: status
    };
    
    try {
      // ${electionId}を追加
      const response = await post(route('admin.update-election-status', electionId), {
        method: "put",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // dataをJSON文字列に変換して送信
        // body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update election status");
      }
      console.log('ok')
      
    } catch (error) {
      console.error("Error updating election status:", error);
      // エラーハンドリング
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now >= startDate && now <= endDate && status === "scheduling") {
        setStatus('running');
        handleUpdateElectionStatus(electionId, status); // scheduling から running になった瞬間にも呼び出す
      } else if (now > endDate && status === "running") {
        setStatus('closed');
        handleUpdateElectionStatus(electionId, status); // running から closed になった瞬間にも呼び出す
        clearInterval(intervalId);
      }
      // console.log("Election ID:", electionId);
      // console.log(startDate)
      // console.log(endDate)
      // console.log(status)
    }, 1000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [startDate, endDate, status, electionId]);
  
  

  return (
    <div>
      <p>{status}</p> 
    </div>
  );
};

export default AutoUpdate;
