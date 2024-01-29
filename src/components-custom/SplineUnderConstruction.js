import React, { useEffect } from "react";
import {
  Text,
  View,
} from "@aws-amplify/ui-react";

import Spline from '@splinetool/react-spline';

export default function SplineUnderConstruction({recordData}) {
    function getDaysToRenew(){
        if(!recordData){
            return;
        }
        const dateNow = new Date();
        let daysToNextMonth = 0;
        while (new Date(dateNow.setDate(dateNow.getDate() + daysToNextMonth)).getMonth() == new Date().getMonth()){
            daysToNextMonth ++;
        }
        return "new Floor in: " + daysToNextMonth + " days";
    }  
    function getSpendingLimit(){
        if(!recordData){
            return;
        }
        return "Max Spending: " + recordData.maxSpending;
    }
    function getCurrentHealth(){
        if(!recordData){
            return;
        }
        
        let currentHealth = (recordData.maxSpending-recordData.currentSpending)/recordData.maxSpending*100;
        console.log(currentHealth);
        if(currentHealth < 0){
            currentHealth = 0; 
        }
        return "Current Health: " + currentHealth + "%";
    }
    function getAnimationURL(){
        if(!recordData){
            return "https://prod.spline.design/1PR6G908oxE1Y5tj/scene.splinecode";
        }
        
        let currentHealth = (recordData.maxSpending-recordData.currentSpending)/recordData.maxSpending*100;
        if(currentHealth > 35){
            return "https://prod.spline.design/1PR6G908oxE1Y5tj/scene.splinecode";
        }else{
            return "https://prod.spline.design/Ac0ObXslZo85bYlL/scene.splinecode";
        }
    }


    return (
        <View className="suc-container">
            <View className="suc-text-limit">{getSpendingLimit()}</View>
            <View className="suc-text-expiry">{getDaysToRenew()}</View>
            <View className="suc-text-health">{getCurrentHealth()}</View>
            <Spline className="suc-animation" scene={getAnimationURL()} />
        </View> 
    );
}