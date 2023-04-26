import axios from "axios";
import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";

const fetch  = ({pageParam = 1  })=> {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)

}

const InfinteQueryPage = ()=>{
    const {data ,fetchNextPage , hasNextPage  , fetchPreviousPage} = useInfiniteQuery('re-infinte' ,fetch , {
            getNextPageParam : (_lastpage , pages) => {
                if(pages.length < 4){
                    return pages.length +1 ;
                }
                else {
                return undefined 
                }
            }
    })    
    return (
            <div> hellow

                {data?.pages.map((group , i)=> {
                    return (
                        <Fragment key={i}> 
                         {group.data.map(color =>{
                            return <div key={color.label}> {color.id} - {color.label} </div>
                         })}
                        </Fragment>

                    )
                } )}
                   
                   <button onClick={fetchNextPage} disabled={!hasNextPage} > fetch two more color </button>
            </div>
        )
}
export default InfinteQueryPage ;