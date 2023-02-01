import { useState } from 'react'

export default function useAddpost(apifn) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,serError] = useState("")
  const [data, setData] = useState({});

  const handleAddpost = async (params)=>{
    try {
        setLoading(true);
        let post = await apifn(params);
        setData(post);
        setSuccess(true);
      } catch (e) {
        serError(e.message)
        setSuccess(false);
      } finally {
        setLoading(false);
      }
  }
  return {loading,success,error,data,handleAddpost}
    
}
