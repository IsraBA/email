// import { useEffect, useState } from 'react'
// import { axiosReq } from '../functions/axiosReq'

// export default function useAxiosReq({ url, body, method , defaultData}) {
//    const [data, setData] = useState(defaultData)
//    const [loading, setLoading] = useState(false)
//    const [error, setError] = useState(false)

//    const fetchData = async () => {
//       setLoading(true)
//       try {
//          const res = await axiosReq({ url, data: body, method })
//          setData(res)
//       } catch (error) {
//          setError(error)
//       } finally {
//          setLoading(false)
//       }
//    }

//    useEffect(() => { fetchData() }, [])

//    return { data, loading, error }
// }
