import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton
} from "@ionic/react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Home.css";

const Home = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>eHealth Application</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="home ion-padding">
					<Container>
						<Row>
							<Col>
								<IonButton
									size="large"
									expand="block"
									style={{ marginBottom: "30px" }}
									routerDirection="forward"
									routerLink={"/today"}>
									Today's Activity
								</IonButton>
							</Col>
						</Row>
						<Row>
							<Col>
								<IonButton
									size="large"
									expand="block"
									routerDirection="forward"
									routerLink={"/patients"}>
									View Patients
								</IonButton>
							</Col>
						</Row>
						<Row></Row>
					</Container>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
