import React, { useEffect, useState } from 'react'

export default function useAPI(getFun) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,serError] = useState("")
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      let data = await getFun();
      setData(data);
      setSuccess(true);
    } catch (e) {
      serError(e.message)
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return {loading,success,error,data,setData,getData}
}
