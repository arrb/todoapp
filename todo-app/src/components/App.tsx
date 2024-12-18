import React from "react";
import styled from "styled-components";

import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

const App: React.FC = () => {
    const { todos, loading, tempDates, setTempDates, updateDueDate, toggleCompletion } = useTodos();

    if (loading) return <Loading>Loading...</Loading>;

    return (
        <Container>
            <Header>Todo App</Header>
            <TodoList>
                {todos.map((todo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            tempDates={tempDates}
                            setTempDates={setTempDates}
                            updateDueDate={updateDueDate}
                            toggleCompletion={toggleCompletion}
                        />
                    );
                })}
            </TodoList>
        </Container>
    );
};

export default App;

const Container = styled.div`
    max-width: 600px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
    padding: 10px;

    @media (max-width: 768px) {
        padding: 5px;
        max-width: 95%;
    }
`;

const Header = styled.h1`
    background-color: #343a40;
    color: white;
    padding: 10px 20px;
    margin: 0;
`;

const TodoList = styled.ul`
    list-style: none;
    padding: 0;
`;

const Loading = styled.div`
    text-align: center;
    margin-top: 50px;
    font-size: 1.2em;
    color: #6c757d;
`;
