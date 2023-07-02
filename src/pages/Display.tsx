import React, { useState, useEffect } from 'react'
import { iData } from '../utils/interface'
import { readTask } from '../utils/Apis'
import  styled  from 'styled-components'
import moment from "moment"
import {RiArrowUpDoubleLine,RiArrowDownSLine} from "react-icons/ri"
import {HiOutlineBars2,HiMiniChevronDoubleDown} from "react-icons/hi2"

const DisplayData = () => {
    const [state, setState] = useState<iData[]>([])
    const [number,setNumber] = useState<number>(0)
    const showNumber= ()=>{
        setNumber(number + 1)
    }
   


    useEffect(() => {

        readTask().then((res: iData[]) => {
            console.log(res)

            return setState(res)
            
        })

    }, [])



    return (
        <div>
            <Container>
                <Main>


                    {
                        state?.map((props: iData, i: number) => (
                            <CardHolder ff={i % 2 === 0 ? "e" : ""} key={i}>
                                <Card ff={i % 2 === 0 ? "e" : ""} >
                                    <Top>{props.task} </Top>
                                    <Top>{moment(props.time).fromNow()}</Top>
                                    <Div ff={i % 2 === 0 ? "e" : ""}>
                                    <Time>{moment(props.time).format("LL")}</Time>
                                    <Time >{moment(props.time).format("hh:mm:ssa")}</Time>
                                    </Div>
                                    <Bottom>
                                        <BB>
                                            <Icons style={{backgroundColor: `${props.color}`}}>I</Icons>
                                            <span>NUC-{props.id?.substring(0,3).toUpperCase()}</span>
                                        </BB>
                                        <TT>
                                        <Reaction onClick={showNumber} >
                                        {props.reaction}
                                                </Reaction>
                                            <Straid>{props.priority === "High" ? <RiArrowUpDoubleLine color='darkorange' size={25}/> : props.priority === "Urgent" ? <HiOutlineBars2 color='red' size={25}/> : props.priority=== "Low" ? <RiArrowDownSLine color='blue' size={25}/> : null  }</Straid>
                                            <Avatar src={props.avatar} />
                                        </TT>
                                    </Bottom>
                                </Card>
                                <Holder ff={i % 2 === 0 ? "e" : ""} >
                                    <Dot />
                                    <Line />
                                </Holder>
                            </CardHolder>
                        ))
                    }
                    
                    {/* <CardHolder>
                        <Card>Card</Card>
                        <Holder>
                            <Dot />
                            <Line />
                        </Holder>
                    </CardHolder>

                    <CardHolder ff="i" >
                        <Card ff="i">Card</Card>
                        <Holder ff="i">
                            <Dot />
                            <Line />
                        </Holder>
                    </CardHolder>
                    <CardHolder>
                        <Card>Card</Card>
                        <Holder>
                            <Dot />
                            <Line />
                        </Holder>
                    </CardHolder>

                    <CardHolder ff="i" >
                        <Card ff="i">Card</Card>
                        <Holder ff="i">
                            <Dot />
                            <Line />
                        </Holder>
                    </CardHolder> */}



                </Main>
            </Container>
        </div>
    )
}

export default DisplayData

const Avatar = styled.img`
width: 25px;
object-fit:cover;
height: 25px;
border-radius: 50%;
background-color: darkorange;
margin-left: 5px;
`

const Reaction = styled.div`
margin-right: 5px;
padding: 10px 14px;
background-color: silver;
border-radius: 50%;
cursor: pointer;
`

const Icons = styled.div`
padding: 5px 14px;
/* background-color: lightgreen; */
margin-right: 5px;
border-radius:2px;
color: white;
`

const Straid = styled.div``

const TT = styled.div`
display:flex;
align-items:center

`

const BB = styled.div`
display:flex;
align-items:center;

span{
    font-size: 11px;
    font-weight: 600
}
`

const Bottom = styled.div`
display:flex;
justify-content: space-between;
`

const Div = styled.div<{ff?:string}>`
position: absolute;
left: ${({ff})=> ff ? "" : "-120px"};
    right: ${({ff})=> ff ? "-120px" : ""};
    top: 55px;
    display: flex;
    flex-direction: column;
`
const Time = styled.div`
   
    
    /* right: -260px; */
    
 
`
const Top = styled.div`
flex:1
`

const Line = styled.div`
width: 5px;
height: 130px;
background-color: lightgreen;

`

const Dot = styled.div`
width: 15px;
height: 15px;
background-color:lightgreen;
border-radius:50%
`

const Holder = styled.div<{ ff?: string }>`
margin-left: 5px;
display:flex;
flex-direction: column;
align-items: center;
/* margin-top:130px; */
margin-top: ${({ ff }:any) => ff ? "0" : "135px"};


`

const Card = styled.div<{ ff?: string }>`
width: 290px;
height: 120px;
border: 1px solid silver;
border-radius:5px;
padding: 5px;
/* margin-top: -135px; */
margin-top: ${({ ff }:any) => ff ? "-135px" : "0px"};
display: flex;
flex-direction: column;
position: relative;
`

const CardHolder = styled.div<{ ff?: string }>`
display: flex;
align-items: center;
flex-direction: ${({ ff }:any) => ff ? "row" : "row-reverse"};
margin-left: ${({ ff }:any) => ff ? "0" : "603px"};
margin-top: ${({ ff }:any) => ff ? "0" : "-135px"};


`

const Main = styled.div`
display:flex;
align-items: center;
flex-direction: column;
margin-top: 100px;

`

const Container = styled.div`
width: 100%;
height: calc(100vh - 80px);
display:flex;
justify-content: center;
`