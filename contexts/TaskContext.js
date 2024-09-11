'use client'

import { createContext, useContext, useState } from "react"
import { addTask, getTasks} from "../utils/indexedDB"

// Create context
const TaskContext = createContext()

// Hook or function to access context
export const useTaskContext = () => {
    return useContext(TaskContext)
}

// Context provider
export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);

    const addNewTask = async (task) => {

        await addTask(task)

        const tasksFromDB = await getTasks()

        setTasks(tasksFromDB)

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

