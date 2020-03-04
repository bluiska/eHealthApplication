import React from "react";
import { PropTypes } from 'prop-types';

const IconButtonContainer = props => {
	const styles = {
		exerciseIcons: {
			display: "flex",
			justifyContent: "space-around"
		}
	};

	return (
		<div style={{ ...styles.exerciseIcons, ...props.style }}>
			{props.children}
		</div>
	);
};

export default IconButtonContainer;

// Definition of props using PropTypes library
IconButtonContainer.propTypes = {
	style: PropTypes.object,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.elementType])
}