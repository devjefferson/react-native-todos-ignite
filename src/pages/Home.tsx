import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(oldState=> [...oldState, {
      id: new Date().getMilliseconds(),
      title: newTaskTitle,
      done: false
    }])
  }

  function handleToggleTaskDone(id: number) {
   const updateTask = tasks.map(task  => ({ ...task  }))

   const foundItem = updateTask.find(item=> item.id === id)

   if(!foundItem)
    return
 
    foundItem.done = !foundItem.done

    setTasks(updateTask) 
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState=> oldState.filter(task=> task.id !== id))
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})