import React, { useState } from 'react';
import type { Task } from '../types';
import TrashIcon from './icons/TrashIcon';

interface TaskManagerProps {
    title: string;
}

const TaskManager: React.FC<TaskManagerProps> = ({ title }) => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, text: 'Review project proposals', completed: false },
        { id: 2, text: 'Prepare for the ML workshop', completed: true },
        { id: 3, text: 'Draft monthly club report', completed: false },
    ]);
    const [newTaskText, setNewTaskText] = useState('');

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskText.trim() === '') return;
        const newTask: Task = {
            id: Date.now(),
            text: newTaskText,
            completed: false,
        };
        setTasks([newTask, ...tasks]);
        setNewTaskText('');
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
            <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">{title}</h2>
            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-grow bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-2 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    aria-label="New task input"
                />
                <button
                    type="submit"
                    className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    aria-label="Add new task"
                >
                    Add
                </button>
            </form>
            <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {tasks.length > 0 ? tasks.map(task => (
                    <li key={task.id} className="flex items-center justify-between bg-light-bg dark:bg-dark-bg p-3 rounded-lg group">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="h-5 w-5 rounded bg-light-border dark:bg-dark-border border-gray-300 dark:border-gray-500 text-primary focus:ring-primary cursor-pointer"
                                aria-labelledby={`task-text-${task.id}`}
                            />
                            <span id={`task-text-${task.id}`} className={`text-text-muted-light dark:text-text-muted-dark transition-colors ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                                {task.text}
                            </span>
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="text-gray-400 dark:text-gray-500 hover:text-error transition-colors opacity-0 group-hover:opacity-100" aria-label={`Delete task: ${task.text}`}>
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </li>
                )) : (
                    <p className="text-gray-500 text-center py-4">No tasks yet. Add one above!</p>
                )}
            </ul>
        </div>
    );
};

export default TaskManager;