import {Fetchsuperheroesquery} from "./QueryHooks/superheroes"
import {Postherodata} from  "./QueryHooks/superheroes"
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import './superhero.css'


export const RQSuperHeroesPage = () => {
const mustation =  Postherodata();
   

const [name , setname] = useState('');
const [alterEgo , setalterEgo] = useState('');
const handleClick=(e)=>{
    e.preventDefault()
    mustation.mutate({name , alterEgo})
   
}
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
            <form onSubmit={handleClick}>  
                <input value={name} onChange={(e)=> setname(e.target.value)} />
                <input value={alterEgo} onChange={(e)=> setalterEgo(e.target.value)} />
                <button type="submit" > add hero</button> 
            </form >
            <button className="fetch" type="button" onClick={refetch}> fetch </button>
            <div className="superhero"> 
            {data?.data.map(hero => (
                <Link  to={`/rq-super-heroes/${hero.id}`}  key={hero.name}>{hero.name}</Link>
            ))} 
            </div>
           {/* 
                this one for select
           {data.map(hero =>{
                return <div key={hero}> {hero}</div>
            })} */}
            
        </div>
    )
}