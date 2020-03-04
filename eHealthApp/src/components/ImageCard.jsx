import React from "react";
import { Image } from "react-bootstrap";
import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { PropTypes } from 'prop-types';

const ImageCard = props => {
	const styles = {
		card: {
			borderRadius: "10px",
			boxShadow: "0px 0px 7px grey"
		},
		cardImg: {
			width: "100%",
			height: "200px",
			objectFit: "cover"
		}
	};

	return (
		<IonCard style={styles.card}>
			<Image src={props.image} style={styles.cardImg} onClick={props.onClick} />
			<IonCardHeader>
				<IonCardTitle>{props.title}</IonCardTitle>
			</IonCardHeader>
			{props.children}
		</IonCard>
	);
};

export default ImageCard;

// Definition of props using PropTypes library
ImageCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.elementType])
}
