/*
The manual health data submission page.
Lists various options to submit health data to the app manually.

Author: Gergo Kekesi
*/

import React, { useState } from "react";
import {
	IonPage,
	IonContent,
	IonList,
	IonCard,
	IonInput,
	IonSelect,
	IonSelectOption,
	IonImg,
	IonCardHeader,
	IonCardTitle,
	IonRippleEffect,
	IonCardContent,
	IonIcon
} from "@ionic/react";
import BackButtonToolbar from "./../components/BackButtonToolbar";
import exercise_img from "../resources/exercise.jpg";
import blood_pressure_img from "../resources/blood_pressure.jpg";
import weight_img from "../resources/weight_scale.jpg";
import walk_img from "../resources/walk.png";
import run_img from "../resources/run.png";
import cycle_img from "../resources/cycle.png";
import { Container, Row, Col, Collapse, Button } from "react-bootstrap";

var inputData = {};

/*
props:
 */
const ManualEntry = props => {
	const styles = {
		cardImg: {
			width: "100%",
			height: "200px"
		},
		cardOption: {
			overflow: "hidden",
			position: "relative"
		},
		exerciseTypeImg: {
			width: "40px",
			height: "40px"
		},
		exerciseIcons: {
			display: "flex",
			justifyContent: "space-around",
			width: "100%",
			height: "40px"
		}
	};

	const [exerciseOptionsOpen, setExerciseOptionsOpen] = useState(false);

	return (
		<IonPage>
			<BackButtonToolbar title={"Manual Entry"} />
			<IonContent className="ion-padding">
				<IonList>
					<IonCard>
						<IonImg
							src={exercise_img}
							style={styles.cardImg}
							onClick={() => {
								console.log(exerciseOptionsOpen);
								setExerciseOptionsOpen(!exerciseOptionsOpen);
							}}
						/>
						<IonCardHeader>
							<IonCardTitle>Exercise</IonCardTitle>
						</IonCardHeader>
						<Collapse in={exerciseOptionsOpen}>
							<IonCardContent>
								<div style={styles.exerciseIcons}>
									<IonImg
										src={walk_img}
										style={styles.exerciseTypeImg}></IonImg>
									<IonImg src={run_img} style={styles.exerciseTypeImg}></IonImg>
									<IonImg
										src={cycle_img}
										style={styles.exerciseTypeImg}></IonImg>
								</div>
							</IonCardContent>
						</Collapse>
					</IonCard>
					<IonCard
						onClick={() => {}}
						className="ion-activatable"
						style={styles.cardOption}>
						<IonImg src={blood_pressure_img} style={styles.cardImg} />
						<IonCardHeader>
							<IonCardTitle>Blood pressure</IonCardTitle>
						</IonCardHeader>
						<IonRippleEffect />
					</IonCard>
					<IonCard
						onClick={() => {}}
						className="ion-activatable"
						style={styles.cardOption}>
						<IonImg src={weight_img} style={styles.cardImg} />
						<IonCardHeader>
							<IonCardTitle>Weight</IonCardTitle>
						</IonCardHeader>
						<IonRippleEffect />
					</IonCard>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default ManualEntry;
