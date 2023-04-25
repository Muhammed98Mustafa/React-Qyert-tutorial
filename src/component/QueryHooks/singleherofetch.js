import axios from "axios";
import { useQuery , useQueryClient  } from "react-query";

const Singleherfetch = (id) => { 
    
    // this if we want to fetch data what about if you have already data in the cache 
   /*  return  (  useQuery("superheroes-queryid"  ,async() => {
       return await  axios.get(`http://localhost:4000/superheroes/${id}`)   } )) */
const queryClient = useQueryClient();
       
       return useQuery(["superheroes-query" , id] , ()=> {
        return axios.get(`http://localhost:4000/superheroes/${id}`)
       }, {
        initialData: ()=> {
            const hero = queryClient.getQueryData("superheroes-query")
            return hero?.filter(hero=> hero.id === parseInt(id)) // we can also use filter or find both are ok 
        }
       }) 
}
export default Singleherfetch ;