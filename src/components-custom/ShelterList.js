import React from "react";
import {
  View,
//   Text,
} from "@aws-amplify/ui-react";
import SplineFloorRecord from "./SplineFloorRecord";

if (process.env.NODE_ENV !== 'test') {
  import ('@aws-amplify/ui-react/styles.css');
}

export default function ShelterList({recordData}){
    if(recordData.length > 0){
        recordData = recordData.slice(1);
        return (
          <>
            <View 
              className="shelter-example"
              margin="25px"
            >
              <SplineFloorRecord limit={999} spending={0}/>
            </View>
            <View 
              className="shelter-list"
              margin="10px"
            >              
              {recordData.map((record) => (
                <View
                  key={record.id}
                  className="shelter-list-entry"
                  margin="25px"
                >
                  <SplineFloorRecord limit={record.maxSpending} spending={record.currentSpending}/>
                </View>
              ))}
            </View>
          </>
        )
    }    
};