import React from "react";
import {
  View,
  Heading,
  Grid,
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
              className="shelter-list"
              flex="auto 100%"
              overflow="auto"
            >              
              {recordData.map((record) => (
                <View
                  key={record.id}
                  className="shelter-list-entry"
                  borderStyle="dashed"
                  borderColor="var(--primary-color)"
                  margin="25px 50px 25px 50px"
                >
                  <SplineFloorRecord limit={record.maxSpending} spending={record.currentSpending}/>
                </View>
              ))}
              <View 
                className="shelter-example"
                
                borderStyle="dashed"
                borderColor="var(--primary-color)"
                margin="25px 50px 25px 50px"
              >
                <Heading 
                  className="header-title"
                  level={4} 
                  columnStart="2"
                  columnEnd="4"
                  margin="auto"
                >
                  EXAMPLE - HEALTHY               
                </Heading>
                <SplineFloorRecord limit={999} spending={0}/>
              </View>
            </View>
          </>
        )
    }    
};