import { getTaskById } from "@/app/api/tasks/route";
import TaskDetailClient from "@/app/components/Tasks/TaskDetailClient";

export default async function TaskDetail({ params }: { params: { id: string } }) {
    const { id } = await params;
    const task = await getTaskById(id);

    if (!task) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h1 className="text-xl font-semibold text-red-800 mb-2">Task Not Found</h1>
                    <p className="text-red-600">The requested task could not be found.</p>
                </div>
            </div>
        );
    }

    return <TaskDetailClient task={task} />;
}