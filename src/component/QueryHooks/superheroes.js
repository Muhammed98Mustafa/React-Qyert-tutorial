import { useQuery  , useQueryClient ,invalidateQueries} from "react-query"
import { useMutation } from "react-query"

import axios from "axios"


const OnSuccess =()=> {
    const queryClient = useQueryClient();

    queryClient.invalidateQueries('superheroes-query');
    console.log('hi')
}
export const Fetchsuperheroesquery = (onSuccess , onError) => { 

   return ( useQuery("superheroes-query", async () => {
        return await axios.get("http://localhost:4000/superheroes")
          
    }, {
        // to reset the cached time the cached time is  5m by default 
       //  cacheTime: 50000, 

       
       // staleTime is the time to fetch the data for example of you don't what to fetch each time the use click on the page and you
       // time to set chach the query you can use staleTime 
       // the defualt time of staletime is zero 0 ;
      // staleTime: 0 ,
       
     //  refetchOnWindowFocus: false ,
        // refetchonWondFoucs  is a boolean option that determines whether the query 
       //should be automatically refetched when the browser window is refocused after being out of focus.
       // true is the defuale value 
       // "always" means it will reftech nither the query stale or refresh every time

       /* To fetch data automatically every five seconds using react-query, you can use the
        useQuery hook with the refetchInterval and refetchIntervalInBackground options. */

      // refetchInterval : false ,// it false  by defauly but it doens not fetch of the user is not on the foucs on the window 

    //refetchIntervalInBackground : false , // by defauly it false we 

    // how to disable automatic fetching of uerquery and we will add refetch 
     
        enabled: false ,

     onSuccess , 
     onError ,

    /* 
        to change the data format here i'm only filteting the name of heroes 
    select:(data) => {
            const mappeddata = data.data.map(heroes => {
                return heroes.name ;
            })
            return mappeddata 
     } */

    }) )
}


export const Postherodata = () => {
  
    return useMutation((hero) => axios.post('http://localhost:4000/superheroes', hero), {
      onSuccess : OnSuccess,
       
      },
    );
  };