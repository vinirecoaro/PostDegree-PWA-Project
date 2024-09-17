'use client'

import { createContext, useContext, useState, useEffect } from "react"
import { addTask, getTasks} from "../utils/indexedDB"
import { addTaskToFirestore, getTasksFromFirestore } from "@/utils/firebase"

// Create context
const TaskContext = createContext()

// Hook or function to access context
export const useTaskContext = () => {
    return useContext(TaskContext)
}

// Context provider
export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
   
    const loadTasks = async () => {
        try {
            const tasksFromDB = await getTasks()

            if(navigator.onLine){
                
                const tasksFromFirestore = await getTasksFromFirestore()
                
                const tasksMap = new Map()
                tasksFromDB.forEach(task => tasksMap.set(task.id, task))
                tasksFromFirestore.forEach(task => tasksMap.set(task.id, task))

                const mergedTasks = Array.from(tasksMap.values())

                await Promise.all(mergedTasks.map( async (task) => {
                    try {
                        await addTask(task)
                    } catch (error) {
                        console.error("Erro ao adicionar tarefa durante a sincronização: ", error)
                    }
                }))

                setTasks(mergedTasks)
            }else{
                setTasks(tasksFromDB)
            } 
        } catch (error) {
            console.log("Erro ao carregar e mesclar tarefas: ", error)
        }
            
    }

    useEffect(() =>{
        loadTasks()
    }, [])

    const addNewTask = async (task) => {

        try {
            if(navigator.onLine){
                await addTaskToFirestore(task)
            }else{
                await addTask(task)
                loadTasks()
            }
        } catch (error) {
            console.log("Erro ao adicionar nova tarefa: ", error)
        }

       
        // const tasksFromDB = await getTasks()
        // setTasks(tasksFromDB)

        // setTasks(
        //     (prevTasks) => [...prevTasks, task]
        // )
    }

    return (
        <TaskContext.Provider value = {{tasks, addNewTask}}>
            {children}
        </TaskContext.Provider>
    )
        
    
}

