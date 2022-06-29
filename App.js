import React, {useState} from 'react';
import { StyleSheet, View, FlatList, Text, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AddTodo from './components/AddTodo';
import Header from './components/Header';
// import Sandbox from './components/Sandbox';
import TodoItem from './components/TodoItem';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'buy coffee', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'play on the switch', key: '3'}
  ])

  const handleDelete = (key) => {
    setTodos((prevState) => {
      return prevState.filter(todo => todo.key != key)
    })
  }

  const handleAdd = (text) => {
    if(text.length > 3) {
      setTodos((prevState) => {
        return [
          {text: text, key: Math.random().toString()},
          ...prevState]
      })
    } else{
      Alert.alert('oops!', 'todos must be over 3 chars long', [
        {text: 'understood'}
      ])
    }
  }


  return (
    // <Sandbox/>
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
      // console.log('dismessed')
    }}>
      <View style={styles.container}>
      <Header/>
      <View style={styles.content}>
       <AddTodo handleAdd={handleAdd}/>
       <View style={styles.list}>
        <FlatList
         data={todos}
         renderItem={({item}) => (
           <TodoItem item={item} handleDelete={handleDelete}/>
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
    flex: 1
  }, 
  list: {
    marginTop: 20,
    flex: 1
  }
});
