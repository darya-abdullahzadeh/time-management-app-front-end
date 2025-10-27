'use client';

import { Task } from "@/payload-types";
import Link from "next/link";

export default function TaskItem({ task }: { task: Task }) {
    const getStatusColor = (status?: string | null) => {
        switch (status) {
            case 'todo':
                return 'bg-gray-400';
            case 'in-progress':
                return 'bg-yellow-500';
            case 'done':
                return 'bg-green-500';
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 ${getStatusColor(task.status)} rounded-full`}></div>
                <Link href={`/tasks/${task.id}`}>{task.title}</Link>
            </div>
            <div className="flex items-center gap-2">
                <p>{task.timeSpent}</p>
            </div>
        </div>
    )
}