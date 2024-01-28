import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  // TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { CreateExpense, DebugCreateMonth } from './components-custom/'
import { listExpenses, listMonthRecords } from "./graphql/queries";
import {
  createExpense as createExpenseMutation,
  deleteExpense as deleteExpenseMutation,
  createMonthRecord as createMonthMutation, 
} from "./graphql/mutations";

import { generateClient } from "@aws-amplify/api";
if (process.env.NODE_ENV !== 'test') {
  import ('@aws-amplify/ui-react/styles.css');
}
const client = generateClient();

const App = ({ signOut }) => {
  const [expenses, setExpenses] = useState([]);
  const [records, setMonths] = useState([]);

  useEffect(() => {
    const setup = () => {
      fetchMonths();
      fetchExpenses(getLatestMonthID());
    }
    setup();    
  }, );

  async function createExpense(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const monthRecordID = getLatestMonthID();
    const data = {
      value: form.get("value"),
      description: form.get("description"),
      monthrecordID: monthRecordID
    };
    try {
      await client.graphql({
        query: createExpenseMutation,
        variables: { input: data },
      });
    } catch(exc) {
      console.log(exc);
    }
      fetchExpenses(getLatestMonthID());
      event.target.reset();
  }

  async function createMonth(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      maxSpending: form.get("value"),
      currentSpending: 0,
    }
    try {
      await client.graphql({
        query: createMonthMutation,
        variables: { input: data },
      });
    } catch(exc) {
      console.log(exc);
    }    
    fetchMonths();
    fetchExpenses(getLatestMonthID());
    event.target.reset();
  } 

  //DEBUG: View All Expenses
  // async function fetchAllExpenses() {
  //   const apiData = await client.graphql({ query: listExpenses });
  //   const expensesFromAPI = apiData.data.listExpenses.items;
  //   setExpenses(expensesFromAPI);
  // }

  function getLatestMonthID(){
    if(records[0]){
      return records[0].id;
    }
  }

  async function fetchExpenses(id) {
    try {
      const apiData = await client.graphql({ query: listExpenses });
      const expensesFiltered = apiData.data.listExpenses.items.filter((expense) => expense.monthrecordID === id);
      setExpenses(expensesFiltered);
    } catch (exc) {
      console.log(exc);
    }
  }

  async function fetchMonths() {
    try {
      const apiData = await client.graphql({ query: listMonthRecords });      
      const expensesFromAPI = apiData.data.listMonthRecords.items;
      // SORT Records in Descending Order
      expensesFromAPI.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setMonths(expensesFromAPI);
    } catch (exc) {
      console.log(exc);
    }    
  }

  async function deleteExpense({ id }) {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    try {    
      await client.graphql({
        query: deleteExpenseMutation,
        variables: { input: { id } },
      });
    } catch (exc) {
      console.log(exc);
    }  
  }

  return (
    <View className="App">
      <View className="view-shelter">
        <View className="shelter-list">
          {records.map((record) => (
            <Flex
              key={record.id}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Text as="strong" fontWeight={700}>
                {record.maxSpending}
              </Text>
              <Text as="span">{record.currentSpending}</Text>
            </Flex>
          ))}
        </View>
      </View>
      <View className="view-editor">
        <View className="editor-header">
            <Heading level={4} className="editor-header-title">Fund Shelter</Heading>
            <Button onClick={signOut} className="editor-header-signout">Sign Out</Button>    
        </View>
        <View className="editor-hero">
          <View className="editor-hero-visualizer">          
          </View>
          <View className="editor-hero-month">
            <DebugCreateMonth createMonthFunction={createMonth}/>
          </View>
        </View>        
        <View className="editor-expenses">
          <Heading level={3}>Current Expenses</Heading>
          <View className="editor-expenses-list">
            {expenses.map((expense) => (
              <Flex
                key={expense.id}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Text as="strong" fontWeight={700}>
                  {expense.value}
                </Text>
                <Text as="span">{expense.description}</Text>
                <Button variation="link" onClick={() => deleteExpense(expense)}>
                  Delete expense
                </Button>
              </Flex>
            ))}
            <CreateExpense createExpenseFunction={createExpense}/>
          </View>
        </View> 
      </View>      
    </View>
  );
};

export default withAuthenticator(App);