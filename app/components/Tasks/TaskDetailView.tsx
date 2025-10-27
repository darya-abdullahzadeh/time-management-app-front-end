'use client';

import { Task } from "@/payload-types";

interface TaskDetailViewProps {
    task: Task;
    onEdit: () => void;
}

export default function TaskDetailView({ task, onEdit }: TaskDetailViewProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status?: string | null) => {
        switch (status) {
            case 'todo':
                return 'bg-gray-400 text-gray-800';
            case 'in-progress':
                return 'bg-yellow-500 text-yellow-900';
            case 'done':
                return 'bg-green-500 text-green-900';
            default:
                return 'bg-gray-400 text-gray-800';
        }
    };

    const getStatusLabel = (status?: string | null) => {
        switch (status) {
            case 'todo':
                return 'To Do';
            case 'in-progress':
                return 'In Progress';
            case 'done':
                return 'Done';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-8 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{task.title}</h1>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                                    {getStatusLabel(task.status)}
                                </span>
                                {task.timeSpent && (
                                    <span className="text-purple-100 text-sm">
                                        Time Spent: {task.timeSpent} minutes
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onEdit}
                            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            Edit Task
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Description */}
                    {task.description && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <p className="text-gray-700 leading-relaxed">{task.description}</p>
                            </div>
                        </div>
                    )}

                    {/* Task Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Task Information</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(task.status)}`}>
                                        {getStatusLabel(task.status)}
                                    </span>
                                </div>
                                {task.timeSpent && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Time Spent:</span>
                                        <span className="text-gray-800 font-medium">{task.timeSpent} minutes</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Timeline</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Created:</span>
                                    <span className="text-gray-800 font-medium">{formatDate(task.createdAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Last Updated:</span>
                                    <span className="text-gray-800 font-medium">{formatDate(task.updatedAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
