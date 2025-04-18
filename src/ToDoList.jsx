import React, { useState, useEffect } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            // Добавляем новую задачу в начало массива
            setTasks(t => [newTask, ...t]);
            setNewTask("");
        }
    }

    // Обработчик нажатия клавиши
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }    
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }    
    }

    return (
        <div className="to-do-list">
            <h1>Doolittle's List</h1>

            <div>
                <input 
                    type="text" 
                    placeholder="Enter A Task..."
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button 
                    className="add-button"
                    onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}>
                            ☝
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}>
                            👇
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;