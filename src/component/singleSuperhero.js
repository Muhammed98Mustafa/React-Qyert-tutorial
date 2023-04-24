    import { useParams } from "react-router-dom";
    import Singleherfetch from "./QueryHooks/singleherofetch";

    const SingleSuperhero = ()=>{

        const {id} = useParams();
        const {data}= Singleherfetch(id);

        
    return (
        <>
        <div>{data?.data.name} - {data?.data.alterEgo}</div>
        </>
    )
    }

    export default SingleSuperhero ;