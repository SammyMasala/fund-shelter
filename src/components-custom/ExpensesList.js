import React from "react";
import {
  Button,
  View,
  Text,
} from "@aws-amplify/ui-react";

if (process.env.NODE_ENV !== 'test') {
  import ('@aws-amplify/ui-react/styles.css');
}

export default function ExpensesList({expenseData, deleteExpenseFunction}){
    return (
        <View className="expenses-list">
            {expenseData.map((expense) => (
                <View
                className="expenses-list-entry"
                key={expense.id}
                >
                <View className="entry-text">
                    <Text className="entry-text-value">
                    {expense.value}
                    </Text>
                    <Text className="entry-text-description">
                    {expense.description}
                    </Text>
                </View>                
                <Button variation="link" className="entry-button-delete" onClick={() => deleteExpenseFunction(expense)}>
                    Delete expense
                </Button>
                </View>
            ))}
        </View>
    );
} 