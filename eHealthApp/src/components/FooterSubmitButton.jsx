import React from "react";
import { IonFooter, IonButton } from "@ionic/react";
import { PropTypes } from 'prop-types';

const FooterSubmitButton = props => {
	return (
		<IonFooter>
			<IonButton color="secondary" expand="block" size="large" onClick={props.onSubmit}>
				Submit
			</IonButton>
		</IonFooter>
	);
};

export default FooterSubmitButton;

// Definition of props using PropTypes library
FooterSubmitButton.propTypes = {
	onSubmit: PropTypes.func.isRequired
}
