'use client'

import { createContext, useContext, useState } from "react"

// Create context
const TaskContext = createContext()

// Hook or function to access context
export const useTaskContext = () => {
    return useContext(TaskContext)
}

// Context provider
export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);

    const addNewTask = (task) => {
        setTasks(
            (prevTasks) => [...prevTasks, task]
        )
    }

    return (
        <TaskContext.Provider value = {{tasks, addNewTask}}>
            {children}
        </TaskContext.Provider>
    )
        
    
}

