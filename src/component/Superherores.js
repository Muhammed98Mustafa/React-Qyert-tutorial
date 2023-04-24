import {Fetchsuperheroesquery} from "./QueryHooks/superheroes"
import { Link } from "react-router-dom";


export const RQSuperHeroesPage = () => {

    const onSuccess = (data) => { 
        console.log("the data is successfully fetched  from the server" , data)
    }
const onError = (err) => {
    console.log("ther is error while fetching the data from the server" , err)
}
    const { isLoading, data, isError, error , refetch} = Fetchsuperheroesquery(onSuccess , onError);

    
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    
    if (isError) {
        return <div>{error.message}</div>
    }
    
    return (
        <div>
            <h2>React Query Super Heroes Page</h2>
            <button onClick={refetch}> fetch </button>
            {data?.data.map(hero => (
                <Link to={`/rq-super-heroes/${hero.id}`}  key={hero.name}>{hero.name}</Link>
            ))} 
           {/* 
                this one for select
           {data.map(hero =>{
                return <div key={hero}> {hero}</div>
            })} */}
            
        </div>
    )
}