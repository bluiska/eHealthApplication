/*
The main entry point for the application, containing the rendering routes
as well as all the styling imports by Ionic.

Author: Gergo Kekesi
*/

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Routing variables */
import "./theme/variables.css";

/*Page Components */
import Home from "./pages/Home";
import Today from "./pages/Today";
import Devices from "./pages/Devices";
import ManualEntry from "./pages/ManualEntry";
import Patients from "./pages/Patients";

const App = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Route path="/home" component={Home} exact={true} />
				<Route exact path="/" render={() => <Redirect to="/home" />} />

				<Route path="/today" component={Today} exact={true} />
				<Route path="/devices" component={Devices} exact={true} />
				<Route path="/manualentry" component={ManualEntry} exact={true} />
				<Route path="/patients" component={Patients} exact={true} />
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
);

export default App;
