'use client';

import { Task } from "@/payload-types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TaskEditForm from "./TaskEditForm";
import TaskDetailView from "./TaskDetailView";
import { updateTask } from "@/app/api/tasks/route";

interface TaskDetailClientProps {
    task: Task;
}

export default function TaskDetailClient({ task }: TaskDetailClientProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(task);
    const router = useRouter();

    const handleSave = async (updateData: Partial<Task>) => {
        try {
            console.log('updateData', updateData);
            console.log('task.id', task.id);
            const updatedTask = await updateTask(task.id.toString(), updateData);
            setCurrentTask(updatedTask);
            setIsEditing(false);
            router.refresh(); // Refresh the page to get updated data
        } catch (error) {
            throw error;
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <TaskEditForm
                task={currentTask}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        );
    }

    return (
        <TaskDetailView
            task={currentTask}
            onEdit={() => setIsEditing(true)}
        />
    );
}
