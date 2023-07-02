import axios from "axios";
import { iData } from "./interface";

const url = "http://localhost:2008/data"



export const readTask = async()=>{
    try {
       return await axios.get(url).then((res:any)=>{
            return res.data
        })
        
    } catch (error) {
        console.log(error)
        
    }
}
export const CreateTask = async(data:iData)=>{
    try {
       return await axios.post(url,data).then((res:any)=>{
            return res.data
        })
        
    } catch (error) {
        console.log(error)
        
    }
}