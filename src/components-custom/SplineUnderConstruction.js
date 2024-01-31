import React from "react";
import {
  View,
} from "@aws-amplify/ui-react";

import Spline from '@splinetool/react-spline';

export default function SplineUnderConstruction({recordData}) {
    function printDaysToRenew(){
        if(!recordData){
            return "No Records Found. New USER? Click Set ->";
        }
        const dateNow = new Date();
        let daysToNextMonth = 0;
        while (new Date(dateNow.setDate(dateNow.getDate() + daysToNextMonth)).getMonth() === new Date().getMonth()){
            daysToNextMonth ++;
        }
        return "new Floor in: " + daysToNextMonth + " days";
    }  
    function printSpendingLimit(){
        if(!recordData){
            return;
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
        <View className="suc-container">
            <View className="suc-text-limit">{printSpendingLimit()}</View>
            <View className="suc-text-expiry">{printDaysToRenew()}</View>
            <View className="suc-text-remaining">{printRemainingFunds()}</View>
            <Spline className="suc-animation" scene={printAnimationURL()} />
        </View> 
    );
}