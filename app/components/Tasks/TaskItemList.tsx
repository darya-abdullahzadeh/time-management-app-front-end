import { Task } from "@/payload-types";
import TaskItem from "./TaskItem";

export default function TaskItemList({tasks}: { tasks: Task[] }) {
    const todoTasks = tasks?.filter(task => task.status === 'todo') || [];
    const inProgressTasks = tasks?.filter(task => task.status === 'in-progress') || [];
    const doneTasks = tasks?.filter(task => task.status === 'done') || [];

    return (
        <div className="space-y-6">
            {/* To Do Tasks */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">To Do ({todoTasks.length})</h2>
                <div className="space-y-2">
                    {todoTasks.length > 0 ? (
                        todoTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No tasks to do</p>
                    )}
                </div>
            </div>

            {/* In Progress Tasks */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">In Progress ({inProgressTasks.length})</h2>
                <div className="space-y-2">
                    {inProgressTasks.length > 0 ? (
                        inProgressTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No tasks in progress</p>
                    )}
                </div>
            </div>

            {/* Done Tasks */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Done ({doneTasks.length})</h2>
                <div className="space-y-2">
                    {doneTasks.length > 0 ? (
                        doneTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No completed tasks</p>
                    )}
                </div>
            </div>
        </div>
    )
}