import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

const fetch = (pageNumber)=> {
}
const PaginatedQuery = ()=> {
    const [page , setpage] = useState(1);

    // here in the key shlould not be fixed here ehch time you click on the next it fetch the nect two 
    const {data , isLoading , error , refetch} = useQuery(['re-paginated' , page] , ()=>{
        return fetch(page)
    } )

   const  handlenext = ()=> {
     fetch()
     setpage(page +1);

   }
   const handlepreviuos =  ()=>{
    fetch();
    setpage(page -1);
   }
    return (
        <> 
        {data?.data.map((data)=>{
            return <h1> {data.id} - {data.label} </h1>
        })}

       <button onClick={handlepreviuos} disabled={page === 1} >Prev</button>
       <button  onClick={handlenext} disabled={page === 4}> next </button>
        </>
    )
}
export default PaginatedQuery ;