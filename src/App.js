import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Heading,
  Text,
  // TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { CreateExpense, DebugCreateMonth } from './components-custom/'
import { listExpenses, expensesByMonthrecordID, listMonthRecords } from "./graphql/queries";
import {
  updateMonthRecord,
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
      fetchExpenses(monthRecordID);
      updateMonth(monthRecordID);
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
  function getMonthState(record){
    const limit = record.maxSpending;
    const current = record.currentSpending;

    const state = current/limit*100;
    //Return state is PLACEHOLDER
    if (state < 50) {
      return "Healthy";
    }else if (state < 75) {
      return "Danger";
    }else if (state < 100) {
      return "Critical";
    } else {
      return "Exceeded"
    }      
  }

  async function fetchExpenses(id) {
    try {
      const apiData = await client.graphql({ query: listExpenses });
      const expensesFiltered = apiData.data.listExpenses.items.filter((expense) => expense.monthrecordID === id);
      // SORT Expenses in Descending Order
      expensesFiltered.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
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

  async function updateMonth(monthID) {
    try {
      const apiData = await client.graphql({ query: expensesByMonthrecordID, variables : {
        monthrecordID: monthID
      }});
      const expensesFromAPI = apiData.data.expensesByMonthrecordID.items;

      let newCurrSpending;
      for (let i=0;i<expensesFromAPI.length;i++){
        newCurrSpending = newCurrSpending + expensesFromAPI[i].value;
      }

      await client.graphql({ query: updateMonthRecord, variables: {
        id: monthID,
        currentSpending : newCurrSpending
      } })
    } catch (exc) {
      console.log(exc);
    }

    fetchMonths();
  }

  async function deleteExpense({ id }) {
    let newExpenses = expenses.filter((expense) => expense.id === id);
    const monthID = newExpenses[0].monthrecordID;
    newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    try {    
      await client.graphql({
        query: deleteExpenseMutation,
        variables: { input: { id } },
      });
    } catch (exc) {
      console.log(exc);
    }  

    updateMonth(monthID);
  }

  return (
    <View className="App">
      <View className="view-shelter">
        <View className="shelter-list">
          {records.map((record) => (
            <View
              key={record.id}
              className="shelter-list-entry"
            >
              {/* PLACEHOLDER */}
              <Text className="placeholder-shelter-value">
                {getMonthState(record)}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View className="view-editor">
        <View className="editor-header">
            <Heading level={4} className="editor-header-title">Fund Shelter</Heading>
            <Button onClick={signOut} className="editor-header-signout">Sign Out</Button>    
        </View>
        <View className="editor-hero">
          <View className="hero-visualizer">          
          </View>
          <View className="hero-month">
            <DebugCreateMonth createMonthFunction={createMonth}/>
          </View>
        </View>        
        <View className="editor-expenses">
          <Heading level={3}>Current Expenses</Heading>
          <View className="expenses-list">
            {expenses.map((expense) => (
              <View
                className="expenses-list-entry"
                key={expense.id}
              >
                <View className="entry-text">
                  <Text className="entry-text-value">
                    {expense.value}
                  </Text>
                  <Text className="entry-text-description">
                    {expense.description}
                  </Text>
                </View>                
                <Button variation="link" className="entry-button-delete" onClick={() => deleteExpense(expense)}>
                  Delete expense
                </Button>
              </View>
            ))}
          </View>
          <CreateExpense createExpenseFunction={createExpense}/>
        </View> 
      </View>      
    </View>
  );
};

export default withAuthenticator(App);