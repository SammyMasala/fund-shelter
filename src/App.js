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
  TutorialOverlay,
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
    const previousLimit = records[0].maxSpending
    const data = {
      maxSpending: previousLimit,
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
    // Flood protection
    if(records.length && (new Date().getMonth() === new Date(records[0].createdAt).getMonth())){
      return;
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
    if(!id){
      return;
    }
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
    if(!monthID){
      return;
    }
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
    if(!monthID){
      // New Month data
      const newMonthData = {
        maxSpending: monthData.maxSpending,
        currentSpending: 0
      }
      createMonth(newMonthData);
      return;
    }
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

  function toggleTutorialOverlay(){
    const tutorialElement = document.getElementsByClassName("tutorial-step");
    if(tutorialElement && tutorialElement[0].classList.contains("visible")){
      for(let i=0;i<tutorialElement.length;i++){
        tutorialElement[i].classList.remove("visible");
      }
    }else if(tutorialElement && !tutorialElement[0].classList.contains("visible")){
      for(let i=0;i<tutorialElement.length;i++){
        tutorialElement[i].classList.add("visible");
      }
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
      gap="0px"
      overflow="hidden" 
    >
      <Grid 
        className="App-header"
        templateRows="1fr"
        templateColumns="1fr 1fr 1fr 1fr"
        backgroundColor="var(--bg-color-bold)"
        margin="auto"
        width="100vw"
        position="fixed"
      >
        <Button 
          className="header-tutorial"
          columnStart="1"
          columnEnd="2"
          margin="auto"
          borderRadius="0"
          onClick={toggleTutorialOverlay} 
        >
          ?
        </Button>  
        <Heading 
          className="header-title"
          level={4} 
          columnStart="2"
          columnEnd="4"
          margin="auto"
        >
          Fund Shelter
        </Heading>
        <Button 
          className="header-signout"
          columnStart="4"
          columnEnd="5"
          margin="auto"
          borderRadius="0"
          borderStyle="hidden"
          onClick={signOut} 
        >
          Sign Out
        </Button>    
      </Grid>
      <View 
        className="App-content"
        flex="auto"
        height="100vh"
        width="100vw"
        overflow="auto"
      >
        <Grid 
          className="views"
          direction="row"
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(6, 1fr)"
          margin="50px 10px 25px 10px"
          height="720px"
          width="1280px"
        >
          <TutorialOverlay />
          <Flex 
            className="view-editor"
            direction="column"
            columnStart="1"
            columnEnd="4"
            rowStart="1"
            rowEnd="7"
            margin="5px"
            backgroundColor="var(--bg-color-bold)"
          >
            <Grid 
              className="editor-hero"
              templateColumns="1fr 1fr 1fr 1fr"
              templateRows="1fr 1fr 1fr 1fr"
              height="225px"
              margin="10px"
              borderColor="var(--primary-color)"
              borderStyle="dashed"
            >              
              <SplineUnderConstruction recordData={records[0]}/>
              <Button  
                className="hero-month-toggle"
                rowStart="1"
                rowEnd="2"
                columnStart="4"
                columnEnd="5"
                borderColor="var(--primary-color)"
                borderStyle="dashed"
                margin="10px"
                onClick={monthToggleClicked}
              >Set</Button>
              <Flex 
                direction="column"
                className="hero-month"
                columnStart="1"
                columnEnd="5"
                rowStart="2"
                rowEnd="4"
                backgroundColor="var(--bg-color)"
                margin="0px 5px 0px 5px"
                opacity=".9"
                borderColor="var(--primary-color)"
                borderStyle="dashed"
              >           
                <UpdateMonthSettings updateFunction={updateLatestMonth} resetFunction={resetLatestMonth}/>
              </Flex>      
            </Grid>        
            <View 
              className="editor-expenses"
              direction="column"
              flex="1 0 400px"
              margin="10px"
              overflow="auto"
              backgroundColor="var(--bg-color)"
            >
              <ExpensesList expenseData={expenses} deleteExpenseFunction={deleteExpense}/> 
              <CreateExpense createExpenseFunction={createExpense}/>
            </View> 
          </Flex>  
          <Flex 
            className="view-shelter"
            direction="column"
            columnStart="4"
            columnEnd="7"
            rowStart="1"
            rowEnd="7"
            backgroundColor="var(--bg-color-bold)"
            margin="5px"
          >
            <ShelterList recordData={records}/> 
          </Flex>    
        </Grid>
      </View>      
    </Flex>
  );
};

export default withAuthenticator(App);