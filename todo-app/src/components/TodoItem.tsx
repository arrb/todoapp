import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import { calculateDaysInfo } from "../utils/datesHelper";
import { Todo } from "./types";

const TodoItem: React.FC<{
    todo: Todo;
    tempDates: { [id: string]: string | null };
    setTempDates: React.Dispatch<React.SetStateAction<{ [id: string]: string | null }>>;
    updateDueDate: (id: string, newDate: string | null) => void;
    toggleCompletion: (id: string, isComplete: boolean) => void;
}> = ({ todo, tempDates, setTempDates, updateDueDate, toggleCompletion }) => {
    const daysInfo = calculateDaysInfo(todo.dueDate);

    return (
        <TodoItemWrapper isComplete={todo.isComplete} isOverdue={daysInfo?.type === "overdue"}>
            <Content>
                <input
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={() => toggleCompletion(todo.id, todo.isComplete)}
                    aria-label={todo.description}
                />
                <Description isComplete={todo.isComplete}>{todo.description}</Description>
            </Content>
            <DueDateContainer>
                <DateInputWrapper>
                    <DatePicker
                        selected={tempDates[todo.id] ? parseISO(tempDates[todo.id]!) : null}
                        onChange={(date: Date | null) => {
                            const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
                            setTempDates(prev => ({ ...prev, [todo.id]: formattedDate }));
                            updateDueDate(todo.id, formattedDate);
                        }}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={50}
                        popperPlacement="bottom-start"
                        isClearable
                        placeholderText="Select a date"
                        dateFormat="MM/dd/yyyy"
                        popperModifiers={[
                            {
                                name: "preventOverflow",
                                fn: async () => {
                                    return {};
                                },
                                options: { boundary: "viewport" },
                            },
                            {
                                name: "flip",
                                fn: async () => {
                                    return {};
                                },
                                options: { fallbackPlacements: ["top"] },
                            },
                        ]}
                        portalId="root"
                    />
                </DateInputWrapper>

                {!todo.isComplete && daysInfo && (
                    <DaysStatus type={daysInfo?.type as "overdue" | "left"}>
                        {daysInfo?.days} days {daysInfo?.type}
                    </DaysStatus>
                )}
            </DueDateContainer>
        </TodoItemWrapper>
    );
};

export default TodoItem;

const TodoItemWrapper = styled.li<{ isComplete: boolean; isOverdue: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    margin: 5px 0;
    background-color: ${({ isComplete, isOverdue }) =>
            isComplete ? "#d4edda" : isOverdue ? "#f8d7da" : "#f0f0f0"};
    border: 1px solid ${({ isComplete, isOverdue }) =>
            isComplete ? "#28a745" : isOverdue ? "#f5c6cb" : "#ddd"};

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 8px;
    }
`;

const Content = styled.div`
    display: flex;
    align-items: center;
`;

const Description = styled.span<{ isComplete: boolean }>`
    margin-left: 10px;
    text-decoration: ${({ isComplete }) => (isComplete ? "line-through" : "none")};
    color: ${({ isComplete }) => (isComplete ? "#6c757d" : "inherit")};
`;

const DueDateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DateInputWrapper = styled.div`
    position: relative;
    width: 100%; 

    .react-datepicker-wrapper {
        width: 100%;
    }

    .react-datepicker__input-container input {
        width: 100%;
        padding: 6px 10px;
        font-size: 0.9em;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`;


const DaysStatus = styled.div<{ type: "overdue" | "left" }>`
    margin-top: 5px;
    font-size: 0.85em;
    font-weight: bold;
    color: ${({ type }) => (type === "overdue" ? "#dc3545" : "#007bff")};
`;
