
import { useState, useEffect } from "react";
import { parseISO, compareAsc, isPast, format } from "date-fns";
import axios from "axios";

import { Todo } from "../components/types";

const API_URL = "https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io";
const apiKey = process.env.REACT_APP_API_KEY;

const sortTodos = (todos: Todo[]): Todo[] => {
    const overdue = todos
        .filter(todo => !todo.isComplete && todo.dueDate && isPast(parseISO(todo.dueDate)))
        .sort((a, b) => compareAsc(parseISO(a.dueDate!), parseISO(b.dueDate!)));

    const upcoming = todos
        .filter(todo => !todo.isComplete && todo.dueDate && !isPast(parseISO(todo.dueDate)))
        .sort((a, b) => compareAsc(parseISO(a.dueDate!), parseISO(b.dueDate!)));

    const noDueDate = todos.filter(todo => !todo.dueDate && !todo.isComplete);

    const completed = todos.filter(todo => todo.isComplete);

    return [...overdue, ...upcoming, ...noDueDate, ...completed];
};

const initializeTempDates = (todos: Todo[]): { [id: string]: string | null } => {
    return todos.reduce((acc, todo) => {
        acc[todo.id] = todo.dueDate ? format(parseISO(todo.dueDate), "yyyy-MM-dd") : null;
        return acc;
    }, {} as { [id: string]: string | null });
};

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [tempDates, setTempDates] = useState<{ [id: string]: string | null }>({});

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Todo[]>(`${API_URL}/get`, {
                    headers: { "X-Api-Key": apiKey },
                });
                const sortedTodos = sortTodos(response.data);
                setTodos(sortedTodos);
                setTempDates(initializeTempDates(sortedTodos));
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const toggleCompletion = async (id: string, isComplete: boolean) => {
        try {
            await axios.patch(
                `${API_URL}/patch/${id}`,
                { isComplete: !isComplete },
                { headers: { "X-Api-Key": apiKey, "Content-Type": "application/json" } }
            );
            setTodos(prevTodos =>
                sortTodos(
                    prevTodos.map(todo =>
                        todo.id === id ? { ...todo, isComplete: !isComplete } : todo
                    )
                )
            );
        } catch (error) {
            console.error("Failed to update completion status:", error);
        }
    };

    const updateDueDate = async (id: string, newDate: string | null) => {
        try {
            await axios.patch(
                `${API_URL}/patch/${id}`,
                { dueDate: newDate },
                { headers: { "X-Api-Key": apiKey, "Content-Type": "application/json" } }
            );
            setTodos(prevTodos =>
                sortTodos(
                    prevTodos.map(todo =>
                        todo.id === id ? { ...todo, dueDate: newDate } : todo
                    )
                )
            );
            setTempDates(prev => ({ ...prev, [id]: newDate }));
        } catch (error) {
            console.error("Failed to update due date:", error);
        }
    };

    return { todos, loading, tempDates, setTempDates, updateDueDate, toggleCompletion };
};
