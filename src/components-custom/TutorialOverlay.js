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
                margin="auto 10px auto 10px"
                borderStyle="dashed"
                borderRadius="5px"
                fontSize="14px"
                padding="10px"
            >Step 1. Hello! Welcome to Fund Shelter. Build Floors for your shelter by managing your money!</View>
            <View 
                className="tutorial-step"
                rowStart="1"
                columnStart="3"
                rowEnd="2"
                columnEnd="4"
                margin="50px 0px auto 0px"
                borderStyle="dashed"
                borderRadius="5px"
                fontSize="14px"
                padding="10px"
            >Step 2. Click ^THIS BUTTON to SET your MONTHLY LIMIT</View>
            <View 
                className="tutorial-step"
                rowStart="4"
                columnStart="1"
                rowEnd="5"
                columnEnd="2" 
                margin="auto 10px auto 10px"
                borderStyle="dashed"
                borderRadius="5px"
                fontSize="14px"
                padding="10px"
            >Step 3. Keep track of your expenses</View>
            <View 
                className="tutorial-step"
                rowStart="1"
                columnStart="4"
                rowEnd="3"
                columnEnd="5"
                margin="auto 10px auto 10px"
                borderStyle="dashed"
                borderRadius="5px"
                fontSize="14px"
                padding="10px"
            >Step 4. The healthier your wallet, the better the Floor constructed for the month! </View>
            <View 
                className="tutorial-step"
                rowStart="1"
                columnStart="1"
                rowEnd="2"
                columnEnd="2"
                margin="0px 10px auto 10px"
                borderStyle="dashed"
                borderRadius="5px"
                fontSize="14px"
                padding="10px"
            >Step 5. Reopen the tutorial any time "?" if you missed anything!</View>
        </>
    );
}