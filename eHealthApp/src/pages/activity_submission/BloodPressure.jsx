import React from "react";
import { IonPage, IonContent, IonItem, IonLabel, IonText, IonInput } from "@ionic/react";
import FooterSubmitButton from "../../components/FooterSubmitButton";
import BackButtonToolbar from "../../components/BackButtonToolbar";

const BloodPressure = () => {

	const styles = {
		label: {
			fontSize: "1.3em"
		},
		star: {
			fontSize: "1.4em"
		}
	};

	return (
		<IonPage>
			<BackButtonToolbar title={"Blood pressure entry"} />
			<IonContent className="ion-padding">
				<IonItem style={{ marginTop: "-20px" }}>
					<IonLabel style={styles.label} position="stacked">
						Systolic Pressure{" "}
						<IonText style={styles.star} color="danger">
							*
						</IonText>
					</IonLabel>
					<IonInput type="number" placeholder="Enter the systolic pressure reading" clearInput />
				</IonItem>
				<IonItem>
					<IonLabel style={styles.label} position="stacked">
						Diastolic Pressure{" "}
						<IonText style={styles.star} color="danger">
							*
						</IonText>
					</IonLabel>
					<IonInput type="number" placeholder="Enter the diastolic pressure reading" clearInput />
				</IonItem>
			</IonContent>
			<FooterSubmitButton
				onSubmit={() => {
					console.log("Hi");
				}}
			/>
		</IonPage>
	);
};

export default BloodPressure;

// Definition of props using PropTypes library
BloodPressure.propTypes = {
	/**
	 * No props
	 */
}
