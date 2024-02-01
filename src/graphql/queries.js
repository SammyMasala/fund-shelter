/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMonthRecord = /* GraphQL */ `
  query GetMonthRecord($id: ID!) {
    getMonthRecord(id: $id) {
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
export const listMonthRecords = /* GraphQL */ `
  query ListMonthRecords(
    $filter: ModelMonthRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMonthRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        maxSpending
        currentSpending
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getExpense = /* GraphQL */ `
  query GetExpense($id: ID!) {
    getExpense(id: $id) {
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
export const listExpenses = /* GraphQL */ `
  query ListExpenses(
    $filter: ModelExpenseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExpenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        description
        monthrecordID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const expensesByMonthrecordID = /* GraphQL */ `
  query ExpensesByMonthrecordID(
    $monthrecordID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelExpenseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    expensesByMonthrecordID(
      monthrecordID: $monthrecordID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        value
        description
        monthrecordID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
