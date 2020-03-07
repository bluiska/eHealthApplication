import React from 'react'
import { IonHeader, IonContent, IonToolbar, IonTitle, IonSlide, IonSlides, IonProgressBar, IonItemGroup, IonItem, IonInput, IonButton, IonButtons, IonIcon, IonLabel, IonRadioGroup, IonRadio, IonList, IonListHeader, IonText, IonFooter, IonGrid, IonCol, IonRow, IonDatetime } from '@ionic/react'
import './RegistrationModal.css';

const slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
};

class RegistrationModal extends React.Component {
    constructor(props) {
        super(props);

        this.user = {
            role: "",
            name: "",
            dob: "",
            gender: "",
            email: "",
            username: "",
            password: ""
        }

        this.state = {
            progress: 0,
            nextLabel: "Next",
            isPrevDisabled: true,
            isNextDisabled: false
        };

        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onPrev() {
        let newState = {
            progress: this.state.progress - 0.25,
        };

        let swiper = document.querySelector('.swiper-container').swiper;
        swiper.slidePrev();
        if(swiper.activeIndex < 1)
            newState.isPrevDisabled = true;

        if(swiper.activeIndex < 3)
            newState.nextLabel = "Next";

        this.setState(newState);

    }

    onNext() {
        let newState = {
            progress: this.state.progress + 0.25
        };

        let swiper = document.querySelector('.swiper-container').swiper;
        swiper.slideNext();
        if(swiper.activeIndex > 0)
            newState.isPrevDisabled = false

        if(swiper.activeIndex === 3)
            newState.nextLabel = "Submit"

        this.setState(newState);
    }

    handleChange(e) {
        console.log("e.target.value")
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return <>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Registration</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => this.props.closeAction()}>
                            <IonIcon name="close" slot="icon-only"></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent
                className="ion-padding"
                scrollY={false}>
                <IonLabel>Current Step</IonLabel>
                <IonProgressBar
                    value={this.state.progress}
                    buffer={this.state.progress + 0.25}/>
                <br />
                <IonSlides options={slideOpts}>
                    <IonSlide>
                        <IonList>
                            <IonRadioGroup>
                                <IonListHeader>
                                    <IonText>Are you a Patient or a Doctor?</IonText>
                                </IonListHeader>

                                <IonItem>
                                    <IonLabel>Patient</IonLabel>
                                    <IonRadio slot="start" value="Patient" />
                                </IonItem>

                                <IonItem>
                                    <IonLabel>Doctor</IonLabel>
                                    <IonRadio slot="start" value="Doctor" />
                                </IonItem>
                            </IonRadioGroup>
                        </IonList>
                    </IonSlide>
                    <IonSlide>
                        <IonItemGroup>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Full Name</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    placeholder="Enter your name."
                                    value={this.user.name}
                                    onIonInput={e => this.handleChange(e)}/>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Email Address</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    placeholder="Enter your email."
                                    value={this.user.email}
                                    onIonInput={e => this.handleChange(e)}/>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Gender</IonLabel>
                            </IonItem>
                                <IonRadioGroup>
                                    <IonRow>
                                        <IonCol>
                                            <IonItem lines="none">
                                                <IonLabel class="radio-label">Male</IonLabel>
                                                <IonRadio slot="start" value="Male" />
                                        	</IonItem>
                                        </IonCol>
                                        <IonCol>
                                            <IonItem lines="none">
                                                <IonLabel>Female</IonLabel>
                                                <IonRadio slot="start" value="Female" />
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>
                                </IonRadioGroup>
                            <IonItem lines="none">
                                <IonLabel position="stacked">Birthdate</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonDatetime
                                    placeholder="Select your date of birth."
                                    displayFormat="MMM DD, YYYY"
                                    pickerFormat="MMM DD, YYYY"
                                    value={this.user.dob}
                                    onIonChange={e => this.handleChange(e)}/>
                            </IonItem>
                        </IonItemGroup>
                    </IonSlide>
                    <IonSlide>
                        <IonItemGroup>
                            <IonItem>
                                <IonLabel>Account Details</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Enter your username."></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Enter your password."></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Reenter your password."></IonInput>
                            </IonItem>
                        </IonItemGroup>
                    </IonSlide>
                    <IonSlide>
                        <IonItemGroup>
                            <IonItem>
                                <IonLabel>Summary</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Enter your username."></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Enter your password."></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput placeholder="Reenter your password."></IonInput>
                            </IonItem>
                        </IonItemGroup>
                    </IonSlide>
                </IonSlides>
            </IonContent>
            <IonFooter className="ion-no-border">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton
                                hidden={this.state.isPrevDisabled}
                                expand="block"
                                shape="round"
                                onClick={this.onPrev}>
                                Back
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton
                                expand="block"
                                shape="round"
                                onClick={this.onNext}>
                                    {this.state.nextLabel}
                            </IonButton>                        
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </>
    }
}

export default ({closeAction}) => {
    return <RegistrationModal closeAction={closeAction}></RegistrationModal>
}