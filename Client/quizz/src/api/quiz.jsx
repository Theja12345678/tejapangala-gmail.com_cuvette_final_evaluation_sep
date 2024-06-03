import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
 

export const createQuiz=async (quiz)=>{
    
    try {
        const reqUrl=  `${backendUrl}/quiz/add`;
        const token=localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
       const response= await axios.post(reqUrl, quiz);
       console.log(response.data)
        return response.data;
       
    }catch(error){
        console.log(error)}
        
    
};


export const submitQuiz=async (id,submissionData)=>{
    
    try {
        const reqUrl=  `${backendUrl}/quiz/${id}/submit`;
        const response = await axios.post(reqUrl, submissionData);
        return response.data;
      } catch (error) {
        throw new Error('Error submitting quiz:', error);
      }
    }






export const getAllQuizzes=async (quizzes)=>{
    
    try {
        const reqUrl=  `${backendUrl}/quiz/all`;
       const response= await axios.get(reqUrl,quizzes)
  
       console.log(response.data)
        return response.data;
       
    }catch(error){
        console.log(error)}
        
    
};

export const getQuestions=async (quizId)=>{
    
    try {
        const reqUrl=  `${backendUrl}/quiz/${quizId}/questions`;
       const response= await axios.get(reqUrl)
  
       console.log(response.data)
        return response.data;
       
    }catch(error){
        console.log(error)}
        
    
};
export const getQuiz=async (quizId)=>{
    
    try {
        const reqUrl=  `${backendUrl}/quiz/${quizId}`;
       const response= await axios.get(reqUrl)
  
       console.log(response.data)
        return response.data;
       
    }catch(error){
        console.log(error)}
        
    
};

