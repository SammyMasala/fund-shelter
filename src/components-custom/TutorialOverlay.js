import React from "react";
import {
    View,
    Grid,
} from "@aws-amplify/ui-react";

export default function TutorialOverlay(){
    return(
        <>
            <View 
                className="tutorial-step"
                rowStart="1"
                columnStart="2"
                rowEnd="2"
                columnEnd="3"
                width="200px"
                margin="auto"
                borderRadius="5px"
                padding="10px"
            >Step 1. Hello! Welcome to Fund Shelter. Build your shelter by managing your money!</View>
            <View 
                className="tutorial-step"
                rowStart="1"
                columnStart="3"
                rowEnd="2"
                columnEnd="4"
                width="200px"
                margin="50px 0px 0px 0px"
                borderRadius="5px"
                padding="10px"
            >Step 2. Click ^THIS BUTTON^ to SET your MONTHLY LIMIT</View>
            <View 
                className="tutorial-step"
                rowStart="4"
                columnStart="1"
                rowEnd="5"
                columnEnd="2" 
                width="200px"
                margin="auto"
                borderRadius="5px"
                padding="10px"
            >Step 3. Note your expenses</View>
            <View 
                className="tutorial-step"
                rowStart="1"
                columnStart="4"
                rowEnd="2"
                columnEnd="5"
                width="200px"
                margin="auto"
                borderRadius="5px"
                padding="10px"
            >Step 4. Each month's progress is tracked by Shelter's Floors </View>
            <View 
                className="tutorial-step"
                rowStart="1"
                columnStart="1"
                rowEnd="2"
                columnEnd="2"
                width="200px"
                margin="auto"
                borderRadius="5px"
                padding="10px"
            >^ Step 5. Reopen the tutorial any time "?" if you missed anything!</View>
        </>
    );
}