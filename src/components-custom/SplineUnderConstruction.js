import React from "react";
import {
  View,
  Grid,
} from "@aws-amplify/ui-react";

import Spline from '@splinetool/react-spline';

export default function SplineUnderConstruction({recordData}) {
    function printDaysToRenew(){
        if(!recordData){
            return "No Records Found. New USER? Click '?' for tutorial";
        }
        let days = 1;
        while(new Date(new Date().setDate(days)).getMonth() === new Date().getMonth()){
            days ++;
        }
        return "new Floor in: " + (days - new Date().getDate()) + " days";
    }  
    function printSpendingLimit(){
        if(!recordData){
            return "Max Spending: 0$";
        }
        return "Max Spending: " + recordData.maxSpending + "$";
    }

    function getRemainingFunds(){
        if(!recordData){
            return;
        }
        
        let remainingFunds = recordData.maxSpending-recordData.currentSpending
        if(remainingFunds < 0){
            remainingFunds = 0; 
        }
        return remainingFunds;
    }

    function printRemainingFunds(){
        const remainingFunds = getRemainingFunds();
        return "Funds Remaining: " + remainingFunds + "$";
    }

    function printAnimationURL(){
        if(!recordData){
            return "https://prod.spline.design/1PR6G908oxE1Y5tj/scene.splinecode";
        }        
        const currentHealth = getRemainingFunds()/recordData.maxSpending*100;
        if(currentHealth > 35){
            return "https://prod.spline.design/1PR6G908oxE1Y5tj/scene.splinecode";
        }else{
            return "https://prod.spline.design/Ac0ObXslZo85bYlL/scene.splinecode";
        }
    }
    

    return (
        <Grid 
            className="suc-container"
            rowStart="1"
            columnStart="1"
            rowEnd="5"
            columnEnd="5"
            templateColumns="1fr 1fr 1fr 1fr"
            templateRows="1fr 1fr 1fr 1fr"
        >
            <View 
                className="suc-text"
                columnStart="1"
                columnEnd="3"
                rowStart="4"
                rowEnd="5"
                margin="auto"
            >
                {printSpendingLimit()}
            </View>
            <View 
                className="suc-text"
                columnStart="2"
                columnEnd="4"
                rowStart="1"
                rowEnd="2"
                margin="auto"
            >
                {printDaysToRenew()}
            </View>
            <View 
                className="suc-text"
                columnStart="3"
                columnEnd="5"
                rowStart="4"
                rowEnd="5"
                margin="auto"
            >
                {printRemainingFunds()}
            </View>
            <Spline 
                className="suc-animation" 
                scene={printAnimationURL()} 
            />
        </Grid> 
    );
}