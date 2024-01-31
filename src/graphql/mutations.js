/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMonthRecord = /* GraphQL */ `
  mutation CreateMonthRecord(
    $input: CreateMonthRecordInput!
    $condition: ModelMonthRecordConditionInput
  ) {
    createMonthRecord(input: $input, condition: $condition) {
      id
      maxSpending
      Expenses {
        nextToken
        __typename
      }
      currentSpending
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateMonthRecord = /* GraphQL */ `
  mutation UpdateMonthRecord(
    $input: UpdateMonthRecordInput!
    $condition: ModelMonthRecordConditionInput
  ) {
    updateMonthRecord(input: $input, condition: $condition) {
      id
      maxSpending
      Expenses {
        nextToken
        __typename
      }
      currentSpending
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteMonthRecord = /* GraphQL */ `
  mutation DeleteMonthRecord(
    $input: DeleteMonthRecordInput!
    $condition: ModelMonthRecordConditionInput
  ) {
    deleteMonthRecord(input: $input, condition: $condition) {
      id
      maxSpending
      Expenses {
        nextToken
        __typename
      }
      currentSpending
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createExpense = /* GraphQL */ `
  mutation CreateExpense(
    $input: CreateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    createExpense(input: $input, condition: $condition) {
      id
      value
      description
      monthrecordID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateExpense = /* GraphQL */ `
  mutation UpdateExpense(
    $input: UpdateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    updateExpense(input: $input, condition: $condition) {
      id
      value
      description
      monthrecordID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteExpense = /* GraphQL */ `
  mutation DeleteExpense(
    $input: DeleteExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    deleteExpense(input: $input, condition: $condition) {
      id
      value
      description
      monthrecordID
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
