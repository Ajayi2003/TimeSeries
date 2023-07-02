import {createBrowserRouter} from "react-router-dom"
import Layout from "../components/common/Layout"
import HomeScreen from "../pages/HomeScreen"
import Display from "../pages/Display"



export const mainRoute = createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        children:[
            {
                index:true,
                element: <HomeScreen/>
            },
            {
                path:"/display",
                element: <Display/>
            }
        ]
    }
])