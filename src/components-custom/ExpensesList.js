import React from "react";
import {
  Button,
  View,
  Text,
  Flex,
} from "@aws-amplify/ui-react";

if (process.env.NODE_ENV !== 'test') {
  import ('@aws-amplify/ui-react/styles.css');
}

export default function ExpensesList({expenseData, deleteExpenseFunction}){
    return (
        <View 
            className="expenses-list"
            rowStart="1"
            rowEnd="4"
            height="70%"
            overflow="auto"
        >
            {expenseData.map((expense) => (
                <Flex
                    className="expenses-list-entry"
                    direction="row"
                    margin="5px"
                    fontSize="14px"
                    key={expense.id}
                >
                    <View 
                        className="entry-text"
                        textAlign="justify"
                        margin="5px 15px 5px 15px"
                    >
                        <Text className="entry-text-value">
                        {expense.value}
                        </Text>
                        <Text 
                            className="entry-text-description"
                            fontStyle="italic"
                        >
                        {expense.description}
                        </Text>
                    </View>                
                    <Button variation="link" className="entry-button-delete" onClick={() => deleteExpenseFunction(expense)}>
                        Delete expense
                    </Button>
                </Flex>
            ))}
        </View>
    );
} 