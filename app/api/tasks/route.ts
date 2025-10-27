import { payloadClient } from "@/lib/payloadClient";
import { Task } from "@/payload-types";
import { NextResponse } from "next/server";

export async function getTasks() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/tasks?limit=100`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}

export async function getTaskById(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/tasks/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching task by id:', error);
        return null;
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL || 'http://localhost:3001'}/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const updatedTask = await response.json();
        return NextResponse.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

export async function updateTask(id: string, updateData: Partial<Task>) {
    try {
        console.log('updateData', updateData);
        const updatedTask = await payloadClient.update<Task>('tasks', id, updateData);
        return updatedTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}