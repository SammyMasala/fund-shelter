/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMonthRecord = /* GraphQL */ `
  subscription OnCreateMonthRecord(
    $filter: ModelSubscriptionMonthRecordFilterInput
  ) {
    onCreateMonthRecord(filter: $filter) {
      id
      maxSpending
      Expenses {
        nextToken
        __typename
      }
      currentSpending
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMonthRecord = /* GraphQL */ `
  subscription OnUpdateMonthRecord(
    $filter: ModelSubscriptionMonthRecordFilterInput
  ) {
    onUpdateMonthRecord(filter: $filter) {
      id
      maxSpending
      Expenses {
        nextToken
        __typename
      }
      currentSpending
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMonthRecord = /* GraphQL */ `
  subscription OnDeleteMonthRecord(
    $filter: ModelSubscriptionMonthRecordFilterInput
  ) {
    onDeleteMonthRecord(filter: $filter) {
      id
      maxSpending
      Expenses {
        nextToken
        __typename
      }
      currentSpending
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateExpense = /* GraphQL */ `
  subscription OnCreateExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onCreateExpense(filter: $filter) {
      id
      value
      description
      monthrecordID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateExpense = /* GraphQL */ `
  subscription OnUpdateExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onUpdateExpense(filter: $filter) {
      id
      value
      description
      monthrecordID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteExpense = /* GraphQL */ `
  subscription OnDeleteExpense($filter: ModelSubscriptionExpenseFilterInput) {
    onDeleteExpense(filter: $filter) {
      id
      value
      description
      monthrecordID
      createdAt
      updatedAt
      __typename
    }
  }
`;
