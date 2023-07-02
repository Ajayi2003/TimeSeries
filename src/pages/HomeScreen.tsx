import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { CreateTask } from '../utils/Apis'
import {v4 as uuidv4 } from "uuid"
import moment from 'moment'

const HomeScreen = () => {

  const inputSchema = yup.object({
    task: yup.string().required("This field must be filled"),
    avatar: yup.string().required("This field must be filled"),
    priority: yup.string().required("This field must be filled"),
  })
  const {register,
     reset, 
     formState: {errors},
     handleSubmit
    } = useForm({
      resolver: yupResolver(inputSchema)
    })
    

    const onHandleSubmit = handleSubmit((res)=>{
      console.log("Submitted",res)
      const dateme = Date.now()
      const main= ["blue", "green", "yellow", "orange", "red","lightgreen", "brown"]
      const mainColor = Math.floor(Math.random() * main.length)
      const DColor:string = main[mainColor]
      const {task,avatar,priority,} = res
      const NewId = crypto.randomUUID()
      CreateTask({
        id: uuidv4(),
        avatar,task,priority, time: Date.now(),color:DColor


      })
      reset()
    })
   
    
  return (
    <div>
        <Container>
            <Main 
            onSubmit={onHandleSubmit}
            >
              {/* Task Input */}
                <InputHolder>
                <InputTitle>Task</InputTitle>
                <Input
                placeholder="Task"
                {...register("task")}
                />
                <Error>{errors.task && "Please Enter a Task"}</Error>
                </InputHolder>
                {/* Avatar Input */}

                <InputHolder>

                <InputTitle>Avatar</InputTitle>
                <Input
                placeholder="Avatar"
                {...register("avatar")}
                />
                <Error>{errors.avatar && "Avatar is needed"}</Error>
                </InputHolder>

                {/* Proprity */}
                {/* <InputHolder>
                <InputTitle>Priority</InputTitle>
                <Input
                placeholder="Priority"
                {...register("priority")}
                />
               
                </InputHolder> */}
                <Selector
                {...register("priority")}
                >
                  <Options>Urgent</Options>
                  <Options>High</Options>
                  <Options>Low</Options>
                </Selector>
                <Error>{errors.priority && "Yet to get the priority of this Task"}</Error>
                <Button
                type='submit'
                >Add Task</Button>
            </Main>
        </Container>
      
    </div>
  )
}

export default HomeScreen
const Options = styled.option`
margin: 10px 0;

`
const Selector = styled.select`
border: 1px solid silver;
position: relative;
height: 40px;
width: 100%;
outline: none;
padding: 10px;

`
const Error = styled.div`
color: red;
font-size: 11px;
position: absolute;
right: 0;

`
const Button = styled.button`
border-radius: 5px;
background-color: #0a0ac9;
color: white;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
margin-top: 10px;
border: 0;
:hover{
  cursor: pointer;
}
`
const InputTitle = styled.div`
font-size: 12px;
position: absolute;
top: -9px;
left: 10px;
background-color: white;
padding: 0 5px;

`
const Input = styled.input`
outline: none;
border:0;
width:95%;
height: 97%;
background-color:white;
padding-left: 10px;
margin-left: 5px;
::placeholder{
  font-family: Montserrat;
}

`
const InputHolder = styled.div`
border: 1px solid silver;
position: relative;
margin: 18px 0;
height: 40px;

`
const Main = styled.form`
width: 350px;
border: 1px solid silver;
padding: 10px;
`
const Container = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: calc(100vh - 80px);
`
