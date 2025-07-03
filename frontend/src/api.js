// import axios from "axios";
// import { API_URL } from "./utils"

// export const CreateTask = async(taskObj)=>{
//     const url = API_URL;
    
//     try{
//         const result = await axios.post(url,taskObj);
//         return result.data;
//     }
//     catch(err){
//         console.error("Error creating task:", err.message);
//         throw err;
//     }
// }




import axios from "axios";
import { API_URL } from "./utils";

// ✅ Create Task
export const CreateTask = async (taskObj) => {
  try {
    const result = await axios.post(API_URL, taskObj);
    return result.data;
  } catch (err) {
    console.error("Error creating task:", err.message);
    throw err;
  }
};

// ✅ Get All Tasks
export const GetAllTasks = async () => {
  try {
    const result = await axios.get(API_URL);
    return result.data;
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    throw err;
  }
};

// ✅ Update Task
export const UpdateTask = async (id, updatedObj) => {
  try {
    const result = await axios.put(`${API_URL}/${id}`, updatedObj);
    return result.data;
  } catch (err) {
    console.error(`Error updating task with id ${id}:`, err.message);
    throw err;
  }
};

// ✅ Delete Task
export const DeleteTask = async (id) => {
  try {
    const result = await axios.delete(`${API_URL}/${id}`);
    return result.data;
  } catch (err) {
    console.error(`Error deleting task with id ${id}:`, err.message);
    throw err;
  }
};
