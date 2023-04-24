import axios from "axios"
import { useQueries } from "react-query"

const fetchUserById=(id)=>{
   return axios.get(`http://localhost:4000/friends/${id}`)
    
}

// in this example  i want to fetch more then one friends actor and i used useQueries insted of useQuery 

const DynamicQueries =()=>{
    const ides= [1 ,2] 

const Data = useQueries(
    ides.map((id) =>{
        return {
            queryKey : ["friends" , id]   , 
            queryFn : ()=>  fetchUserById(id), 
        }
    })
)
  console.log(Data)

return (
<div>
    Dynamic Query parallel

        {Data?.map(person =>{
            return  <div key={person.data.data.name}>  {person.data.data.name}   </div>
        })}

     </div>

)
     


}
export default DynamicQueries;

