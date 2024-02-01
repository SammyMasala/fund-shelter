/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMonthRecord = /* GraphQL */ `
  subscription OnCreateMonthRecord(
    $filter: ModelSubscriptionMonthRecordFilterInput
    $owner: String
  ) {
    onCreateMonthRecord(filter: $filter, owner: $owner) {
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
export const onUpdateMonthRecord = /* GraphQL */ `
  subscription OnUpdateMonthRecord(
    $filter: ModelSubscriptionMonthRecordFilterInput
    $owner: String
  ) {
    onUpdateMonthRecord(filter: $filter, owner: $owner) {
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
export const onDeleteMonthRecord = /* GraphQL */ `
  subscription OnDeleteMonthRecord(
    $filter: ModelSubscriptionMonthRecordFilterInput
    $owner: String
  ) {
    onDeleteMonthRecord(filter: $filter, owner: $owner) {
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
export const onCreateExpense = /* GraphQL */ `
  subscription OnCreateExpense(
    $filter: ModelSubscriptionExpenseFilterInput
    $owner: String
  ) {
    onCreateExpense(filter: $filter, owner: $owner) {
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
export const onUpdateExpense = /* GraphQL */ `
  subscription OnUpdateExpense(
    $filter: ModelSubscriptionExpenseFilterInput
    $owner: String
  ) {
    onUpdateExpense(filter: $filter, owner: $owner) {
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
export const onDeleteExpense = /* GraphQL */ `
  subscription OnDeleteExpense(
    $filter: ModelSubscriptionExpenseFilterInput
    $owner: String
  ) {
    onDeleteExpense(filter: $filter, owner: $owner) {
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
