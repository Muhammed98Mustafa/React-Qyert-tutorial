# Note from tutorial 

note: do not forget to warp you project by QueryClientProvider and QueryClient in the main components 
1- UserQuery take to parameters the first parameter is the key of the query and the second paramter is the function the fetch the data 

    example : 
     useQuery("superheroes-query", async () => {
        return await axios.get("http://localhost:4000/superheroes")
          
    },)
 
 2- const { isLoading, error, isError, data }=  useQuery("superheroes-query", async () => {
        return await axios.get("http://localhost:4000/superheroes")
          
    },)
     The isLoading and error variables are used to handle loading and error states respectively.
     the fetched data is stored inside the data 

3- react query provide devtools that halp you to chech fething 

import { ReactQueryDevtools } from 'react-query/devtools'
<ReactQueryDevtools initialIsOpen={false} position='botton-right' />
theis one should be in app above the    QueryClientProvider


4-The cacheTime property specifies the number of milliseconds that the query result should be cached before it becomes stale and needs to be refetched. By default, react-query caches query results for 5 minutes. we can use it as thired argument in useQuery 

 const { isLoading, error, isError, data }=  useQuery("superheroes-query", async () => {
        return await axios.get("http://localhost:4000/superheroes")
          
    },
    chachTime:50000; the default time is 5 minutes ;
    )

5-refetchonWondFoucs  is a boolean option that determines whether the query 
       should be automatically refetched when the browser window is refocused after being out of focus. 
        true is the defuale value 
        "always" means it will reftech nither the query stale or refresh every time
       
        const { isLoading, error, isError, data }=  useQuery("superheroes-query", async () => {
        return await axios.get("http://localhost:4000/superheroes")
          
    },
    chachTime:50000; the default time is 5 minutes ;
    refetchonWondFoucs: ture 
    )

6-if you want to fetch automatically each period of time we should use refetchInterval in the thired argument of useQuery
  refetchInterval: time in ms  
the default behaviour of the query is zero ms 


7- refetchIntervalInBackground  is the same as refetchInterval but the difference en refetchIntervalInBackground  the fetching is 
happning event if the user are left the tab or not fouced 


8- how to stop to ftech automatically or to made the fetching by clicking on button only 
we should ues to refetch  paramter and put enabled to false in the thired argument 

example 
 const { isLoading, data, error, refetch } = useQuery(
    'myQuery',
    async () => {
      const response = await axios.get('/api/data');
      return response.data;
    },
    {
      enabled: false, // disable automatic fetching
    }

  
    <button onClick={() => refetch()}>Fetch data</button>


9-The staleTime option is a time duration in milliseconds, and it defaults to 0, which means that data is always considered stale and will be refetched on every render.


-10 how to deal with side effects  passedd as thired arguments the callback function is outside the useQuery 
onSuccess: A callback function that will be called when the query is successfully resolved.
onError: A callback function that will be called when the query fails.
onSettled: A callback function that will be called when the query is either successfully resolved or fails.
onLoading: A callback function that will be called when the query starts loading.
onFetch: A callback function that will be called when the query starts fetching data.
 

 11- how to filter or map specific query parameters in fetched results ? by using select as thired argument 
  select:(data => {
    return data.data.map(here => {
      return here.name 
    })
    so this going to reflect to the data paramter in the query and the data will only contain the name of the heroes name   
    const {data} = useQuery(....);
 })

 // parallel Query 

 // dynamic Queries