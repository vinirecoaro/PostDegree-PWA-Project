import {initializeApp} from 'firebase/app'
import {getFirestore, collection, addDoc, getDocs, updateDocs, doc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCjKveH8vpTWa52hsUg-okK_qyeO0AYzXo",
    authDomain: "pwa-new-schedule-app.firebaseapp.com",
    projectId: "pwa-new-schedule-app",
    storageBucket: "pwa-new-schedule-app.appspot.com",
    messagingSenderId: "868162537157",
    appId: "1:868162537157:web:220310b7a5556fc46192ac",
    measurementId: "G-J3SY4WKV82"
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const addTaskToFirestore = async (task) => {
try{
    const docRef = await addDoc(collection(db, "tasks"), task)
    console.log("Documento escrito com sucesso: ", docRef.id)
}catch (error){
    console.error("Erro ao adicionar o documento: ", error)
}
}

export const getTasksFromFirestore = async () => {
    const query = await getDocs(collection(db, "tasks"))
    return query.docs.map(doc => doc.data())
}