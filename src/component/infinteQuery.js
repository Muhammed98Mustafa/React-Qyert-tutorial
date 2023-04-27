import {useInfiniteQuery } from "react-query"
import axios from "axios"
import { Fragment } from "react"

const fetchpage = ({pageParam = 1}) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

const InfiniteQuery = ()=>{

    const {data , fetchNextPage , hasNextPage} = useInfiniteQuery("color", fetchpage ,{
        getNextPageParam: (_lastpage , pages)=>{
            if (pages.length < 4) {
                return pages.length + 1
              } else {
                return undefined
              }
        }

        } ,{
            pagesize:1
        }
    )
    console.log(data)
    return (
       <div>
      {data?.pages.map((group,i) =>{

        return(<Fragment key={i}>

            {group.data.map(color => {
               return <h2> {color.id}-{color.label}</h2>
            })}
        </Fragment>)
      }) }
            <button onClick={fetchNextPage} disabled={!hasNextPage}> fetch two more</button>
            
       </div>
     
    )
}
export default InfiniteQuery ;