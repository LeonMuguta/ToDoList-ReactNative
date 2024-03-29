import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import AddTodo from './components/addTodo';
import TodoItem from './components/todoItem';
import Sandbox from './components/sandbox';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'Buy Coffee', key: '1'},
    {text: 'Create an app', key: '2'},
    {text: 'Play on the switch', key: '3'}
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          {text: text, key: Math.random().toString()},
          ...prevTodos
        ];
      })
    } else {
      Alert.alert('Oops!!','Please enter more than 3 characters',[
        {text: 'Ok', onPress: () => console.log('Alert closed')},
      ]);
    }
  }

  return (
    //<Sandbox />
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); console.log("Dismissed keyboard") }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({item}) => (
                <TodoItem item={item} pressHandler={pressHandler}/>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    backgroundColor: 'cyan',
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
