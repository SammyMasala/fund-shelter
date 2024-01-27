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
    await client.graphql({
      query: createExpenseMutation,
      variables: { input: data },
    });
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
    await client.graphql({
      query: createMonthMutation,
      variables: { input: data },
    });
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
    const apiData = await client.graphql({ query: listExpenses });
    const expensesFiltered = apiData.data.listExpenses.items.filter((expense) => expense.monthrecordID === id);
    console.log(id);
    setExpenses(expensesFiltered);
  }

  async function fetchMonths() {
    const apiData = await client.graphql({ query: listMonthRecords });
    const expensesFromAPI = apiData.data.listMonthRecords.items;
    // SORT Records in Descending Order
    expensesFromAPI.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setMonths(expensesFromAPI);
  }

  async function deleteExpense({ id }) {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    await client.graphql({
      query: deleteExpenseMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Expenses App</Heading>
      <CreateExpense createExpenseFunction={createExpense}/>
      <Heading level={2}>DEBUG: CREATE MONTH</Heading>
      <DebugCreateMonth createMonthFunction={createMonth}/>
      <Heading level={2}>Current Expenses</Heading>
      <View margin="3rem 0">
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
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);