import { openDB } from "idb";

const dbName = 'tasks-db'

export async function initDB(){
    return openDB(dbName, 1,{
        upgrade(db){
            if(!db.objectStoreNames.contains('tasks')){
                db.createObjectStore('tasks', {keyPath: 'id', autoIncrement: true})
            }
        }
    })
}

export async function addTask(task) {
    const db = await initDB()
    return db.add('tasks', task)
}

export async function getTasks() {
    const db = await initDB()
    return db.getAll('tasks')
}