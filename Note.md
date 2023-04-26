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

12-
  parallel Query 
 if you want to fetch multiple data at the same time react query do that for you 
  
  examples:    as we see here it alise name for data heroes and friends 
      const {data: heroes}  = useQuery("heroesfetchheroes" , ()=>{
        return axios.get("http://localhost:4000/superheroes")
     });
     const {data: friends}  = useQuery("firendfetch" , ()=>{
        return axios.get("http://localhost:4000/friends")
     });

  dynamic Queries 
   Dynamic Queries on there hand used to fetch data based on dynamic variables such as array parameters for example multiple id users
    so you need to iterate over the variables then fetch your data 
   useQueries(
    ides.map( id => {

    
      querykey: ["fetchdata" , id] ,
      queryfn : axios.get(`http://localhost:4000/${id}`) ,
   } )
   )

  13- now let come to scenario that you have two fetch and the second fetch depending on the first fetch reasult how to handle that 
  with react queyr we have some thing called dependent queries 
  const id =  useQuery("key" , ()=>{
    return axios.get(`http://localhost:4000/email` )
  }) 

  const idname  = useQuery("key" , ()=>{
    return axios.get(`http://localhost:4000/${id}`)
  } , 
  enabled: !! id   // so here in the line the second fetch will not applay until the id is retrieved form the first fetch
  )


  14- let say you have some already data in cache and you want to use that data how you can used 
  باختصار قيمة موجوده بالتخزين كيف فيني استدعيها 
     import useQueryClient 
     create instance of useQueryClient  const client = useQueryClient()

    useQuery("key" , 
      return axois.get("http://localhost/id)
    ) , {
      thired argumetn we pass the intital values 

      initialData: ()=> {
        const hero = client.getQueryData("key of data you want to retrieve");
        return hero?.find(hero => hero.id === id) you can use filter also as find as here it will give you same results

      }
    }
15- paginated Query 
we can use paginated fetch by sending the the server to fetch limit element and the page also 
 so each time you click next the page shoudld increse or deacrese if you click previous 
  page is state  here 
 const fetch = (pageNumber)=> {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}
 const {data , isLoading , error , refetch} = useQuery(['re-paginated' , page] , ()=>{
        return fetch(page)
    } )

15-useInfiniteQuery is a React Query hook that allows you to paginate data from an API endpoint. It works by fetching a certain number of items from the server and then fetching more items as needed when the user scrolls to the end of the list.
 it take three argument 
     useInfinteQuery has many new obj such as fetchNextPage , hasNextPage see the doc for more i
     information.