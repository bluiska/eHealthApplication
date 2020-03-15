import React from "react";
import walk_img from "../../resources/walk.png";
import run_img from "../../resources/run.png";
import cycle_img from "../../resources/cycle.png";
import weight_img from "../../resources/weight.png";
import {
  IonCard,
  IonCardHeader,
  IonIcon,
  IonLabel,
  IonCardContent
} from "@ionic/react";
import { Accordion, Row, Col, Image } from "react-bootstrap";
import { heart } from "ionicons/icons";

const RecordCard = props => {
  const activityType = props.data.id.split("_")[0];
  console.log(activityType);

  const styles = {
    iconimg: {
      width: "20px",
      height: "20px",
      margin: "auto"
    },
    cycleImg: {
      width: "30px",
      height: "20px",
      margin: "auto"
    }
  };

  const renderActivityTitle = activityType => {
    switch (activityType) {
      case "BloodPressureReading":
        return <h2>Blood pressure</h2>;
      case "WeightReading":
        return <h2>Weight</h2>;
      case "Cycling":
        return <h2>Cycling</h2>;
      case "Running":
        return <h2>Running</h2>;
      case "Walking":
        return <h2>Walking</h2>;
      default:
        return <h2>Exercise</h2>;
    }
  };

  const renderActivityValues = (activityType, data) => {
    console.log(new Date(data.timestamp).toLocaleTimeString());
    switch (activityType) {
      case "BloodPressureReading":
        return (
          <div>
            <IonLabel>
              Diastolic pressure: {data.diastolicPressure}mmHg
            </IonLabel>
            <IonLabel>Systolic pressure: {data.systolicPressure}mmHg</IonLabel>
            <IonLabel>
              Taken at: {new Date(data.timestamp).toLocaleTimeString()}
            </IonLabel>
          </div>
        );
      case "WeightReading":
        return (
          <div>
            <IonLabel>Weight: {data.weight}kg</IonLabel>
            <IonLabel>
              Taken at: {new Date(data.timestamp).toLocaleTimeString()}
            </IonLabel>
          </div>
        );
      case "Cycling":
        return (
          <div>
            <IonLabel>Calories burnt: {data.caloriesBurnt}</IonLabel>
            <IonLabel>Distance travelled: {data.distance}</IonLabel>
            <IonLabel>
              Start time: {new Date(data.startTime).toLocaleTimeString()}
            </IonLabel>
            <IonLabel>
              End time: {new Date(data.endTime).toLocaleTimeString()}
            </IonLabel>
          </div>
        );
      case "Running":
        return (
          <div>
            <IonLabel>Calories burnt: {data.caloriesBurnt}</IonLabel>
            <IonLabel>Distance travelled: {data.distance}</IonLabel>
            <IonLabel>Steps taken: {data.steps}</IonLabel>
            <IonLabel>
              Start time: {new Date(data.startTime).toLocaleTimeString()}
            </IonLabel>
            <IonLabel>
              End time: {new Date(data.endTime).toLocaleTimeString()}
            </IonLabel>
          </div>
        );
      case "Walking":
        return (
          <div>
            <IonLabel>Calories burnt: {data.caloriesBurnt}</IonLabel>
            <IonLabel>Distance travelled: {data.distance}</IonLabel>
            <IonLabel>Steps taken: {data.steps}</IonLabel>
            <IonLabel>
              Start time: {new Date(data.startTime).toLocaleTimeString()}
            </IonLabel>
            <IonLabel>
              End time: {new Date(data.endTime).toLocaleTimeString()}
            </IonLabel>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  const renderActivityValue = (activityType, data) => {
    switch (activityType) {
      case "BloodPressureReading":
        return <div>{data.diastolicPressure}mmHg</div>;
      case "WeightReading":
        return <div>{data.weight}</div>;
      case "Cycling":
        return <div>{data.caloriesBurnt}</div>;
      case "Running":
        return <div>{data.caloriesBurnt}</div>;
      case "Walking":
        return <div>{data.caloriesBurnt}</div>;
      default:
        return <div></div>;
    }
  };

  return (
    <Accordion>
      <IonCard key={props.index}>
        <Accordion.Toggle as={IonCardHeader} eventKey={props.index}>
          <Row className="align-content-center justify-content-center">
            <Col xs="2">
              {activityType === "BloodPressureReading" && (
                <div style={styles.iconimg}>
                  <IonIcon icon={heart} style={styles.iconimg} />
                </div>
              )}
              {activityType === "WeightReading" && (
                <div style={styles.iconimg}>
                  <Image src={weight_img} style={styles.iconimg} />
                </div>
              )}
              {activityType === "Cycling" && (
                <Image src={cycle_img} style={styles.cycleImg} />
              )}
              {activityType === "Running" && (
                <Image src={run_img} style={styles.iconimg} />
              )}
              {activityType === "Walking" && (
                <Image src={walk_img} style={styles.iconimg} />
              )}
            </Col>
            <Col xs="6">
              <IonLabel style={styles.title}>
                {renderActivityTitle(activityType)}
              </IonLabel>
            </Col>
            <Col xs="4">
              <IonLabel style={styles.value}>
                {console.log(props)}
                <h3>{props.data.value}</h3>
                {renderActivityValue(activityType, props.data)}
              </IonLabel>
            </Col>
          </Row>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={props.index}>
          <IonCardContent>
            {renderActivityValues(activityType, props.data)}
          </IonCardContent>
        </Accordion.Collapse>
      </IonCard>
    </Accordion>
  );
};

export default RecordCard;
