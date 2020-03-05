/**
 * DeviceCard is a reusable component that displays short information
 * about Bluetooth devices on the Devices page (mainly)
 * The purpose of this component is to encapsulate the logic from the Devices page
 * and to ensure that we render only necessary components
 */

// Importing required dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { Container, Row, Col } from 'react-bootstrap';
import { sync, checkmark } from 'ionicons/icons';

// Component's styling
const styles = {
  cardContainer: {
    display: 'flex',
    width: '100%'
  },
  iconStyle: {
    // display: 'block',
    // width: '100%',
    marginLeft: '-15px',
    fontSize: '25px',
    // textAlign: 'left'
  },
  deviceNameStyle: {
    width: '100%',
    height: '100%',
    fontSize: '16px',
    textAlign: 'center'
  },
  deviceConnectionStatus: {
    width: '100%',
    height: '100%',
    fontSize: '16px',
    textAlign: 'right'
  }
};

const DeviceCard = props => {
  // Extracting props attributes into separate variables
  // Eliminates having to write props.title, props.connected, etc.
  const { title, connected, connectionStatus, onClick } = props;

  /**
   * Returns the colour for the text component
   * Based on the text value of connectionStatus prop
   */
  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'CONNECTED':
        return 'var(--ion-color-success)';
      case 'CONNECTING':
        return 'var(--ion-color-warning)';
      case 'UNKNOWN':
        return 'var(--ion-color-warning)';
      case 'PAIRED':
        return 'var(--ion-color-success)';
      case 'PAIRING':
        return 'var(--ion-color-warning)';
      default:
        return 'var(--ion-color-danger)';
    }
  };

  return (
    <IonCard style={{ marginTop: '10px' }} button={true} onClick={onClick}>
      <IonCardContent style={styles.cardContainer}>
        <Container>
          <Row>
            <Col xs={2}>
              <IonIcon style={styles.iconStyle} icon={connected ? checkmark : sync} />
            </Col>
            <Col xs={4}>
              <p style={styles.deviceNameStyle}>{title.toUpperCase()}</p>
            </Col>
            <Col xs={6} >
              <p
                style={{
                  ...styles.deviceConnectionStatus,
                  color: getConnectionColor()
                }}
              >
                {connectionStatus}
              </p>
            </Col>
          </Row>
        </Container>
      </IonCardContent>
    </IonCard>
  );
};

export default DeviceCard;

// Definition of props using PropTypes library
DeviceCard.propTypes = {
  title: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  connectionStatus: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
