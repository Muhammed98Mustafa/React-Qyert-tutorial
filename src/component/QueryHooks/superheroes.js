import { useQuery  , useQueryClient ,invalidateQueries} from "react-query"
import { useMutation } from "react-query"

import axios from "axios"



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

// there is better way to do this called Optimistic updatea 
/* 
export const Postherodata = (hero) => {
  
   
    return useMutation((hero) => axios.post('http://localhost:4000/superheroes', hero), {
      onSuccess : (data)=>{
     queryClient.setQueryData("superheroes-query" , (olddata)=> {
          console.log("entered")
          return {
                  ...olddata,
           data: [...olddata.data , data.data]
          }
      });
      },
       
      },
    );
  }; */

  export const Postherodata = (hero) => {
    const queryClient = useQueryClient();
  
    return useMutation((hero) => axios.post('http://localhost:4000/superheroes', hero), {
      onMutate: async newHero => {
        await queryClient.cancelQueries('super-heroes')
        const previousHeroData = queryClient.getQueryData('super-heroes')
        queryClient.setQueryData('super-heroes', oldQueryData => {
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData.data,
              { id: oldQueryData?.data?.length + 1, ...newHero }
            ]
          }
        })
        return { previousHeroData }
      },
      onError: (_err, _newTodo, context) => {
        queryClient.setQueryData('super-heroes', context.previousHeroData)
      },
      onSettled: () => {
        queryClient.invalidateQueries('super-heroes')
      }
    });
  };
  

    