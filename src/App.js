import React, { useState, useEffect } from "react";
import {
  Button,
  Heading,
  View,
  withAuthenticator,
  Flex,
  Grid,
} from "@aws-amplify/ui-react";
import { ExpensesList, 
  ShelterList,
  CreateExpense, 
  // DebugCreateMonth, 
  SplineUnderConstruction, 
  UpdateMonthSettings,
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
  import ("./App.css");
}

const client = generateClient();

const App = ({ signOut }) => {
  const [expenses, setExpenses] = useState([]);
  const [records, setMonths] = useState([]);

  useEffect(() => {
    fetchMonths();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateMonth(getLatestMonthID());
    // eslint-disable-next-line
  }, [expenses])

  useEffect(() => {
    fetchExpenses(getLatestMonthID());
    // eslint-disable-next-line
  }, [records])

  function checkRenewStatus() {
    if(!records.length){
      return;
    }
    const cmpDate = (new Date().getFullYear() === new Date(records[0]).getFullYear()) && (new Date().getMonth() === new Date(records[0]).getMonth());   
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

  async function createMonth(data) {
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
        checkRenewStatus()
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
          currentSpending: newCurrSpending
        }
      }});
    } catch (exc) {
      console.log(exc);
    }
    fetchMonths();
  }

  async function updateLatestMonth(monthData) {
    const monthID = getLatestMonthID();
    try {
      let newCurrSpending = 0;
      for (let i=0;i<expenses.length;i++){
        newCurrSpending = newCurrSpending + expenses[i].value;
      }
      await client.graphql({ query: updateMonthRecord, variables: {
        input: {
          id: monthID,
          maxSpending: monthData.maxSpending
        }
      }});
    } catch (exc) {
      console.log(exc);
    }
    fetchMonths();
  }

  function resetLatestMonth(monthData) {
    const data = {
      maxSpending: monthData.maxSpending,
      currentSpending: 0,
    }
    deleteMonth(getLatestMonthID());
    createMonth(data);
  }

  async function deleteMonth({ id }) {
    let newRecords = records.filter((record) => record.id !== id);
    if (JSON.stringify(records) !== JSON.stringify(newRecords)){
      setMonths(newRecords);
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

  async function deleteExpense({ id }) {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
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

  function monthToggleClicked(event){
    const btnElement = event.target;
    const updateMonthElement = document.getElementsByClassName("hero-month");
    if(updateMonthElement && btnElement.classList.contains("clicked")){
      btnElement.classList.remove("clicked");
      updateMonthElement[0].classList.remove("visible")
    }else if(updateMonthElement && !btnElement.classList.contains("clicked")){
      btnElement.classList.add("clicked");
      updateMonthElement[0].classList.add("visible")
    }
    
  }

  return (
    <Flex 
      className="App"
      direction="column"
      width="100vw"
      overflow="hidden" 
    >
      <Grid 
        className="editor-header"
        templateRows="1fr"
        templateColumns="1fr 1fr 1fr 1fr"
        margin="auto"
        width="95vw"
        flex="auto"
      >
        <Heading 
          className="editor-header-title"
          level={4} 
          columnStart="2"
          columnEnd="4"
          margin="auto"
        >
          Fund Shelter
        </Heading>
        <Button 
          className="editor-header-signout"
          columnStart="4"
          columnEnd="5"
          margin="auto"
          id="button-signout" 
          onClick={signOut} 
        >
          Sign Out
        </Button>    
      </Grid>
      <Flex className="views"
        direction="row"
        gap="10px"
        wrap="nowrap"
        width="100vw"
        overflow ="auto" 
      >
        <Flex 
          className="view-editor"
          direction="column"
          flex="1 0 475px"
          height="100vh"
          margin="5px"
          overflow="auto"
        >
          <Grid 
            className="editor-hero"
            templateColumns="1fr 1fr 1fr 1fr"
            templateRows="1fr 1fr 1fr 1fr"
            height="35vh"
            margin="0px 10px 0px 10px"
          >
            <View 
              className="hero-visualizer"
              columnStart="1"
              columnEnd="5"
              rowStart="1"
              rowEnd="5"
            >  
              <SplineUnderConstruction recordData={records[0]}/>
            </View>    
            <Button  
              className="hero-month-toggle"
              rowStart="1"
              rowEnd="2"
              columnStart="4"
              columnEnd="5"
              margin="10px"
              onClick={monthToggleClicked}
            >Set</Button>
            <View 
              className="hero-month"
              columnStart="1"
              columnEnd="5"
              rowStart="2"
              rowEnd="4"
            >           
              <UpdateMonthSettings updateFunction={updateLatestMonth} resetFunction={resetLatestMonth}/>
            </View>      
          </Grid>        
          <View 
            className="editor-expenses"
            direction="column"
            flex="1 0 200px"
            margin="0px 10px 10px 10px"
          >
            <ExpensesList expenseData={expenses} deleteExpenseFunction={deleteExpense}/> 
            <CreateExpense createExpenseFunction={createExpense}/>
          </View> 
        </Flex>  
        <Flex 
          className="view-shelter"
          direction="column"
          flex="1 0 475px"
          height="100vh"
          margin="5px"
          overflow="auto"
        >
          <ShelterList recordData={records}/> 
        </Flex>    
      </Flex>
    </Flex>
  );
};

export default withAuthenticator(App);