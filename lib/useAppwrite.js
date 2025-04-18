
import { useState ,useEffect} from 'react'

const useAppwrite=(fn)=>{
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


    const fetchData=async()=>{  

      setIsLoading(true);

      try {
        const response=await fn();

        setData(response);
      } catch (error) {
        //  console.log(error); 
         Alert.alert("Error",error.message)
      } finally{
        setIsLoading(false);
      }
    }

    useEffect(()=>{
       fetchData();
     },[]);
  // console.log(data); 

    const refetch=()=>fetchData(); 

    return { data,refetch,isLoading }
  }

  export default useAppwrite;