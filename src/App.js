import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Heading,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { ExpensesList, 
  ShelterList,
  CreateExpense, 
  DebugCreateMonth, 
  SplineUnderConstruction, 
} from './components-custom/'
import { expensesByMonthrecordID, listMonthRecords } from "./graphql/queries";
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
    fetchMonths();
  }, []);

  useEffect(() => {
    updateMonth(getLatestMonthID());
  }, [expenses])

  useEffect(() => {
    fetchExpenses(getLatestMonthID());
  }, [records])

  function checkRenewStatus() {
    if(!records.length){
      return;
    }
    const cmpDate = (new Date().getFullYear() == new Date(records[0]).getFullYear()) && (new Date().getMonth() == new Date(records[0]).getMonth());   
    if(cmpDate){
      renewMonth();
    }    
  }
  
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
      
      fetchExpenses(monthRecordID);
    } catch(exc) {
      console.log(exc);
    }      
    event.target.reset();
  }

  async function renewMonth() {
    const data = {
      maxSpending: records[0].maxSpending,
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
  // async function fetchExpenses() {
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
    if (state < 75) {
      return "Healthy";
    }else if (state < 100) {
      return "Critical";
    } else {
      return "Exceeded"
    }      
  }

  async function fetchExpenses(id) {
    try {
      const apiData = await client.graphql({ query: expensesByMonthrecordID, variables: {
        monthrecordID: id
      } });
      const expensesFromAPIData = apiData.data.expensesByMonthrecordID.items;
      // SORT Expenses in Descending Order
      expensesFromAPIData.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      if (JSON.stringify(expenses) !== JSON.stringify(expensesFromAPIData)){
        setExpenses(expensesFromAPIData);
      }
    } catch (exc) {
      console.log(exc);
    }
  }

  async function fetchMonths() {
    try {
      const apiData = await client.graphql({ query: listMonthRecords });      
      const recordsFromAPI = apiData.data.listMonthRecords.items;

      if(!recordsFromAPI.length){
        return;
      }
      // SORT Records in Descending Order
      recordsFromAPI.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      if (JSON.stringify(records) !== JSON.stringify(recordsFromAPI)){
        setMonths(recordsFromAPI);
      }
      checkRenewStatus();
    } catch (exc) {
      console.log(exc);
    }    
  }

  async function updateMonth(monthID) {
    try {
      let newCurrSpending = 0;
      for (let i=0;i<expenses.length;i++){
        newCurrSpending = newCurrSpending + expenses[i].value;
      }
      await client.graphql({ query: updateMonthRecord, variables: {
        input: {
          id: monthID,
          currentSpending : newCurrSpending
        }
      }});
    } catch (exc) {
      console.log(exc);
    }
    fetchMonths();
  }

  async function deleteExpense({ id }) {
    let newExpenses = expenses.filter((expense) => expense.id === id);
    newExpenses = expenses.filter((expense) => expense.id !== id);
    if (JSON.stringify(expenses) !== JSON.stringify(newExpenses)){
      setExpenses(newExpenses);
    }
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
        <ShelterList recordData={records}/> 
      </View>
      <View className="view-editor">
        <View className="editor-header">
            <Heading level={4} className="editor-header-title">Fund Shelter</Heading>
            <Button id="button-signout" onClick={signOut} className="editor-header-signout">Sign Out</Button>    
        </View>
        <View className="editor-hero">
          <View className="hero-visualizer">  
            <SplineUnderConstruction recordData={records[0]}/>
          </View>
          <View className="hero-month">
            <DebugCreateMonth createMonthFunction={createMonth}/>
          </View>
        </View>        
        <View className="editor-expenses">
          <ExpensesList expenseData={expenses} deleteExpenseFunction={deleteExpense}/> 
          <CreateExpense createExpenseFunction={createExpense}/>
        </View> 
      </View>      
    </View>
  );
};

export default withAuthenticator(App);