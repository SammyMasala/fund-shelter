import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listExpenses } from "./graphql/queries";
import {
  createExpense as createExpenseMutation,
  deleteExpense as deleteExpenseMutation,
} from "./graphql/mutations";

import { generateClient } from "@aws-amplify/api";
if (process.env.NODE_ENV !== 'test') {
  import ('@aws-amplify/ui-react/styles.css');
}
const client = generateClient();

const App = ({ signOut }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const apiData = await client.graphql({ query: listExpenses });
    const expensesFromAPI = apiData.data.listExpenses.items;
    setExpenses(expensesFromAPI);
  }

  async function createExpense(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      value: form.get("value"),
      description: form.get("description"),
    };
    await client.graphql({
      query: createExpenseMutation,
      variables: { input: data },
    });
    fetchExpenses();
    event.target.reset();
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
      <View as="form" margin="3rem 0" onSubmit={createExpense}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="value"
            placeholder="Expense Name"
            label="Expense Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Expense Description"
            label="Expense Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Expense
          </Button>
        </Flex>
      </View>
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