import { Box, Container, List, ListItem, ListItemText } from '@material-ui/core';
import { Todo } from 'models';
import * as React from 'react';
import { useState } from 'react';
import TodoForm from '../components/TodoForm';

export interface TodoPageProps {}

export function TodoPage(props: TodoPageProps) {
  const [todoList, setTodoList] = useState<Array<Todo>>([]);

  const initialValues: Todo = {
    title: '',
  };

  const handleTodoFormSubmit = (formValues: Todo) => {
    const newTodo = {
      ...formValues,
      id: new Date().getTime(),
    };

    setTodoList((prevList) => [...prevList, newTodo] as Todo[]);
  };

  return (
    <Box>
      <Container>
        <TodoForm initialValues={initialValues} onSubmit={handleTodoFormSubmit} />
        <List>
          {todoList.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.title} />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}
