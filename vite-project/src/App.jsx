import React, { useState } from "react";
import "./App.css";
import trashIcon from "./trash.svg";

function ListItem(props) {
	return (
		<div className="list-item row jc-space-between">
			<span
				className={props.itemData.isComplete ? "task-complete" : ""}
				onClick={() => props.markComplete(props.index)}
			>
				{props.itemData.description}
			</span>
			<img
				className="delete-icon"
				src={trashIcon}
				onClick={() => props.deleteTask(props.index)}
			/>
		</div>
	);
}

function App() {
	const [taskInput, updateTaskInput] = useState("");
	const [toDoList, updateToDoList] = useState([]);

	const addNote = () => {
		toDoList.push({ description: taskInput, isComplete: false });
		updateToDoList(toDoList);
		updateTaskInput("");
	};

	const inputKeyDown = (event) => {
		if (event.keyCode === 13) addNote();
	};

	const deleteTask = (index) => {
		const newList = toDoList.filter((item, i) => i !== index);
		updateToDoList(newList);
	};

	const markComplete = (index) => {
		const list = [...toDoList];
		list[index].isComplete = !list[index].isComplete;
		updateToDoList(list);
	};

	return (
		<div className="app-background">
			<p className="heading-text">To Do App</p>
			<div className="task-container">
				<div>
					<input
						className="text-input"
						value={taskInput}
						onChange={(event) =>
							updateTaskInput(event.target.value)
						}
						onKeyDown={inputKeyDown}
					/>
					<button className="add-button" onClick={addNote}>
						ADD
					</button>
				</div>
				{toDoList?.length ? (
					toDoList.map((toDoObject, index) => (
						<ListItem
							index={index}
							itemData={toDoObject}
							deleteTask={deleteTask}
							markComplete={markComplete}
						/>
					))
				) : (
					<p className="no-item-text">No Task Added!</p>
				)}
			</div>
		</div>
	);
}

export default App;
