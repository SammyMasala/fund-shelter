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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchMonthRecords = /* GraphQL */ `
  query SearchMonthRecords(
    $filter: SearchableMonthRecordFilterInput
    $sort: [SearchableMonthRecordSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableMonthRecordAggregationInput]
  ) {
    searchMonthRecords(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        maxSpending
        currentSpending
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const searchExpenses = /* GraphQL */ `
  query SearchExpenses(
    $filter: SearchableExpenseFilterInput
    $sort: [SearchableExpenseSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableExpenseAggregationInput]
  ) {
    searchExpenses(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        value
        description
        monthrecordID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
