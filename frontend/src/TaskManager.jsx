// import { useEffect, useState } from "react"
// import axios from "axios";


// function TaskManager() {
//   const [ch,setCh] = useState(0);
//   const [inp, setInp] = useState('');
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const geting = async () => {
//       const response = await axios.get('http://localhost:8080/task')
//       setData(response.data.data);
//     }
//     geting();
//   },[ch]);
//   const clicked = async () => {
//     if (!inp.trim()) return;
//     try {
//       const res = await axios.post('http://localhost:8080/task', {
//         name: inp
//       });
//       setCh(ch+1);
//       // console.log(res.data);
//       setInp('');
//     } catch (err) {
//       console.error("Error:", err.message);
//     }
//   };
//   const deletes = async(id)=>{
//     await axios.delete(`http://localhost:8080/task/${id}`);
//     setCh(ch-1);
//   }
//   const updates = async(id,title)=>{
//     setInp(title);
//     deletes(id);
//   }
//   return (

//     <>
//       <div className="flex gap-y-4 flex-col items-center justify-evenly">

//         <h1 className="text-4xl font-bold">Task Manager</h1>

//         <div className="flex gap-x-5 items-center justify-evenly">
//           <input placeholder="Add your Task" className="px-2 rounded border" type="text" value={inp} onChange={(e) => setInp(e.target.value)} />
//           <button onClick={clicked} className="border rounded px-2">Add</button>
//         </div>
//       </div>
//       <div className="flex flex-col mt-4 gap-y-5">

//         {
//           data.map((item, index) => (
//             <div key={index} className="flex items-center justify-evenly  mx-5 p-2 rounded-2xl bg-zinc-400">
//               <p className="w-[60%]">{item.name}</p>
//               <button onClick={()=>updates(item._id,item.name)}  className="border bg-zinc-300 rounded px-2">Update</button>
//               <button onClick={()=>deletes(item._id)} className="border bg-zinc-300 rounded px-2">Delete</button>
//             </div>
//           ))
//         }
//       </div>
//     </>
//   )
// }
// export default TaskManager





import { useEffect, useState } from "react";
import { CreateTask, GetAllTasks, UpdateTask, DeleteTask } from "./api"; // path may vary

function TaskManager() {
  const [ch, setCh] = useState(0);
  const [inp, setInp] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await GetAllTasks();
        setData(response.data); // adjust based on backend response shape
      } catch (err) {
        console.error("Error fetching tasks:", err.message);
      }
    };
    getData();
  }, [ch]);

  const clicked = async () => {
    if (!inp.trim()) return;
    try {
      await CreateTask({ name: inp });
      setInp('');
      setCh(prev => prev + 1);
    } catch (err) {
      console.error("Error creating task:", err.message);
    }
  };

  const deletes = async (id) => {
    try {
      await DeleteTask(id);
      setCh(prev => prev + 1);
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  const updates = async (id, oldTitle) => {
    const newTitle = prompt("Update task title:", oldTitle);
    if (!newTitle?.trim()) return;
    try {
      await UpdateTask(id, { name: newTitle });
      setCh(prev => prev + 1);
    } catch (err) {
      console.error("Error updating task:", err.message);
    }
  };

  return (
    <>
      <div className="flex gap-y-4 flex-col items-center justify-evenly">
        <h1 className="text-4xl font-bold">Task Manager</h1>
        <div className="flex gap-x-5 items-center justify-evenly">
          <input
            placeholder="Add your Task"
            className="px-2 rounded border"
            type="text"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />
          <button onClick={clicked} className="border rounded px-2">Add</button>
        </div>
      </div>

      <div className="flex flex-col mt-4 gap-y-5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-evenly mx-5 p-2 rounded-2xl bg-zinc-400">
            <p className="w-[60%]">{item.name}</p>
            <button onClick={() => updates(item._id, item.name)} className="border bg-zinc-300 rounded px-2">Update</button>
            <button onClick={() => deletes(item._id)} className="border bg-zinc-300 rounded px-2">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskManager;
