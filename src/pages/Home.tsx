import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks([
      ...tasks,
      {
        done: false,
        title: newTaskTitle,
        id: new Date().getTime(),
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const taskModified = tasks.find((task) => task.id === id);
    if (!taskModified) return;
    setTasks([
      ...tasks.filter((task) => task.id !== id),
      {
        ...taskModified,
        done: !taskModified.done,
      },
    ]);
  }

  function handleRemoveTask(id: number) {
    setTasks([...tasks.filter((task) => task.id !== id)]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
