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

  // const cleanUpDistance = distance => {

  // }

  const renderActivityValues = (activityType, data) => {
    let date = new Date(data.timestamp);
    switch (activityType) {
      case "BloodPressureReading":
        return (
          <div>
            <IonLabel>
              Diastolic pressure: {data.diastolicPressure}mmHg
            </IonLabel>
            <IonLabel>Systolic pressure: {data.systolicPressure}mmHg</IonLabel>
            <IonLabel>
              Time submitted: {date.getUTCHours()}:{date.getUTCMinutes()}
            </IonLabel>
          </div>
        );
      case "WeightReading":
        // date = new Date(data.timestamp);
        return (
          <div>
            <IonLabel>Weight: {data.weight.toFixed(2)}kg</IonLabel>
            <IonLabel>
              Time submitted: {date.getUTCHours()}:{date.getUTCMinutes()}
            </IonLabel>
          </div>
        );
      case "Cycling":
        const startDate = new Date(data.startTime);
        const endDate = new Date(data.endTime);
        return (
          <div>
            {data.caloriesBurnt && (
              <IonLabel>
                Calories burnt:{" "}
                {data.caloriesBurnt === -1 ? "N/A" : data.caloriesBurnt}
              </IonLabel>
            )}
            {data.distance && (
              <IonLabel>
                Distance travelled: {data.distance.toFixed(2)}km
              </IonLabel>
            )}
            <IonLabel>
              Start time: {startDate.getUTCHours()}:{startDate.getUTCMinutes()}
            </IonLabel>
            <IonLabel>
              End time: {endDate.getUTCHours()}:{endDate.getUTCMinutes()}
            </IonLabel>
            <IonLabel>
              Time submitted: {endDate.getUTCHours()}:{endDate.getUTCMinutes()}
            </IonLabel>
          </div>
        );
      case "Running":
        const startDate2 = new Date(data.startTime);
        const endDate2 = new Date(data.endTime);
        return (
          <div>
            {data.caloriesBurnt && (
              <IonLabel>
                Calories burnt:{" "}
                {data.caloriesBurnt === -1 ? "N/A" : data.caloriesBurnt}
              </IonLabel>
            )}
            {data.distance && (
              <IonLabel>
                Distance travelled: {data.distance.toFixed(2)}km
              </IonLabel>
            )}
            {data.steps && <IonLabel>Steps taken: {data.steps}</IonLabel>}
            <IonLabel>
              Start time: {startDate2.getUTCHours()}:
              {startDate2.getUTCMinutes()}
            </IonLabel>
            <IonLabel>
              End time: {endDate2.getUTCHours()}:{endDate2.getUTCMinutes()}
            </IonLabel>
            <IonLabel>
              Time submitted: {endDate2.getUTCHours()}:
              {endDate2.getUTCMinutes()}
            </IonLabel>
          </div>
        );
      case "Walking":
        const startDate3 = new Date(data.startTime);
        const endDate3 = new Date(data.endTime);
        return (
          <div>
            {data.caloriesBurnt && (
              <IonLabel>
                Calories burnt:{" "}
                {data.caloriesBurnt === -1 ? "N/A" : data.caloriesBurnt}
              </IonLabel>
            )}
            {data.distance && (
              <IonLabel>
                Distance travelled: {data.distance.toFixed(2)}km
              </IonLabel>
            )}
            {data.steps && <IonLabel>Steps taken: {data.steps}</IonLabel>}
            <IonLabel>
              Start time: {startDate3.getUTCHours()}:
              {startDate3.getUTCMinutes()}
            </IonLabel>
            <IonLabel>
              End time: {endDate3.getUTCHours()}:{endDate3.getUTCMinutes()}
            </IonLabel>
            <IonLabel>
              Time submitted: {endDate3.getUTCHours()}:
              {endDate3.getUTCMinutes()}
            </IonLabel>
          </div>
        );
      default:
        return <div></div>;
    }
  };
  // time submitted

  const renderActivityValue = (activityType, data) => {
    switch (activityType) {
      case "BloodPressureReading":
        const endDate = new Date(data.timestamp);
        return (
          <div>
            {endDate.getUTCHours()}:{endDate.getUTCMinutes()}
          </div>
        );
      case "WeightReading":
        const endDate2 = new Date(data.timestamp);
        return (
          <div>
            {endDate2.getUTCHours()}:{endDate2.getUTCMinutes()}
          </div>
        );
      case "Cycling":
        const endDate3 = new Date(data.endTime);
        return (
          <div>
            {endDate3.getUTCHours()}:{endDate3.getUTCMinutes()}
          </div>
        );
      case "Running":
        const endDate4 = new Date(data.endTime);
        return (
          <div>
            {endDate4.getUTCHours()}:{endDate4.getUTCMinutes()}
          </div>
        );
      case "Walking":
        const endDate5 = new Date(data.endTime);
        return (
          <div>
            {endDate5.getUTCHours()}:{endDate5.getUTCMinutes()}
          </div>
        );
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
