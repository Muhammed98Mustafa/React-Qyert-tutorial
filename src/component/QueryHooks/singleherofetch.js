import axios from "axios";
import { useQuery } from "react-query";

const Singleherfetch = (id) => { 
    return  (  useQuery("superheroes-queryid"  ,async() => {
       return await  axios.get(`http://localhost:4000/superheroes/${id}`)   } )
)}
export default Singleherfetch ;