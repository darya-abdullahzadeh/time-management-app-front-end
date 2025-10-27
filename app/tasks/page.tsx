import { getTasks } from "../api/tasks/route";
import TaskItemList from "../components/Tasks/TaskItemList";

export default async function Tasks() {
    const tasks = await getTasks();
    console.log(tasks);
    return (
        <div>
            <h1>Tasks</h1>
            <TaskItemList tasks={tasks.docs} />
        </div>
    )
}