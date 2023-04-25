import axios  from "axios"
import { useQuery } from "react-query"

const DependentlQuery =()=>{
    const email = "vishwas@example.com"
const {data: user} = useQuery(
`useremail${email}`,  () => {return axios.get(`http://localhost:4000/users/${email}`)}
)
 const channelid = user?.data.channelId ;

 const {data } = useQuery(["channel" , channelid] , () => {
    return axios.get(` http://localhost:4000/channels/${channelid}`) 
 } , {
    enabled: !!channelid
 })
 console.log(data)
 const courses = data?.data.courses

    return(
            <> 
            Dependent Query Page
            {courses.map((course , index)=>{
                return <div key={course}> {index+1}: {course}</div>
            })}
            </>
    )
}

export default DependentlQuery