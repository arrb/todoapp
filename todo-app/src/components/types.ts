export interface TodoItemProps {
    todo: {
        id: string;
        description: string;
        isComplete: boolean;
        dueDate: string | null;
    };
    tempDates: { [id: string]: string | null };
    updateDueDate: (id: string, newDate: string | null) => void;
    toggleCompletion: (id: string, isComplete: boolean) => void;
}

export interface Todo {
    id: string;
    description: string;
    isComplete: boolean;
    dueDate: string | null;
}