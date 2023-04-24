import axios from "axios";
import { useQuery } from "react-query";

const ParallelQuerypage = ()=>{

    // we can use parallel queries in usequer so it asynchronously action {data: heroes } is aliased name because data will repeted 

     const {data: heroes}  = useQuery("heroesfetchheroes" , ()=>{
        return axios.get("http://localhost:4000/superheroes")
     });
     const {data: friends}  = useQuery("firendfetch" , ()=>{
        return axios.get("http://localhost:4000/friends")
     });

    return(
        <>
        
        <div> Parallel Query Page</div>
        {heroes?.data.map(heroess=>{
            return <div> {heroess.name}</div>
        })}
         {friends?.data.map(friend=>{
            return <div> {friend.name}</div>
        })}
        </>
    )

}
export default ParallelQuerypage ;