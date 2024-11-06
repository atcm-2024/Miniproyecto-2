import {useState, useEffect} from 'react'
import { fetchData } from '@/utils/fetchData'

export default function useData(url) {
    const [data, setData] = useState({})

    useEffect(()=>{
        fetchData(url)
            .then((rs)=>setData(rs))
            .catch((error)=>console.log(error))
    },[url])
    return {data}
}
