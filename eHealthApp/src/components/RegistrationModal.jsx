import React from 'react'
import { IonHeader, IonContent, IonToolbar, IonTitle, IonSlide, IonSlides, IonProgressBar, IonItem, IonInput, IonButton, IonButtons, IonIcon, IonNote, IonLabel, IonRadioGroup, IonRadio, IonList, IonFooter, IonGrid, IonCol, IonRow, IonDatetime } from '@ionic/react'
import CredentialQueries from '../queries/CredentialQueries';
import './RegistrationModal.css';

const slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
};

class RegistrationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Progress-defined state
            progress: 0,
            nextLabel: "Next",
            indicativeLabel: "Role Selection",
            isPrevDisabled: true,
            isNextEnabled: false,
            passwordStrength: "dark",

            // User-related state
            role: "",
            name: "",
            dob: "",
            gender: "",
            email: "",
            username: "",
            password: "",
            passwordReentered: ""
        };

        // On navigation button press functions
        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);

        // On step change functions
        this.onStepChange = this.onStepChange.bind(this);
        this.onSubmission = this.onSubmission.bind(this);
        this.checkStepOne = this.checkStepOne.bind(this);
        this.checkStepTwo = this.checkStepTwo.bind(this);
        this.checkStepThree = this.checkStepThree.bind(this);

        // On value change functions
        this.isStepOneComplete = this.isStepOneComplete.bind(this);
        this.isStepTwoComplete = this.isStepTwoComplete.bind(this);
        this.isStepThreeComplete = this.isStepThreeComplete.bind(this);

        // Validation methods
        this.validateEmail = this.validateEmail.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);

        // Get today's date for birthdate picker
        this.getDateToday = this.getDateToday.bind(this);
    }

    onPrev = () => {
        let newState = {
            progress: this.state.progress - 0.25,
        };

        let swiper = document.querySelector('.swiper-container').swiper;
        swiper.slidePrev();

        if(swiper.activeIndex < 1)
            newState.isPrevDisabled = true;

        if(swiper.activeIndex < 3)
            newState.nextLabel = "Next";

        this.setState(newState, () => {
            this.onStepChange(swiper.activeIndex)
        });
    }

    onNext = () => {
        let newState = {
            progress: this.state.progress + 0.25
        };

        let swiper = document.querySelector('.swiper-container').swiper;
        swiper.slideNext();

        let callback = () => {
            this.onStepChange(swiper.activeIndex);
        }
        
        if(swiper.activeIndex > 0)
            newState.isPrevDisabled = false;

        if(swiper.activeIndex === 3)
            newState.nextLabel = "Submit";

        if(this.state.nextLabel === "Submit") {
            newState.isNextEnabled = false;
            callback = () => {
                this.onSubmission();
            };
        }

        this.setState(newState, callback);
    }

    onStepChange = (level) => {
        let label;

        switch (level) {
            case 0:
                label = "Role Selection";
                this.checkStepOne();
                break;
            case 1:
                label = "Personal Details";
                this.checkStepTwo();
                break;
            case 2:
                label = "Account Creation";
                this.checkStepThree();
                break;
            case 3:
                label = "Summary";
                break;
            default:
                label = "";
                break;
        }

        this.setState({
            indicativeLabel: label
        });
    }

    onSubmission = () => {
        // Call Database
        let details = this.state;
        CredentialQueries.createUserProfile(`${details.role}s`, {
            name: details.name,
            email: details.email,
            gender: details.gender,
            dob: details.dob
        })
        .then(res => {
            CredentialQueries.createUserCredential({
                user: { ID: res.ID },
                username: details.username,
                password: details.password
            })
            .then(res => console.log(res))
            .catch(err => alert(err));
        })
        .catch(err => alert(err));

        setTimeout(() => {
            this.props.closeAction(true);
        }, 1000);
    }

    checkStepOne = () => {
        this.setState({
            isNextEnabled: (this.state.role !== "")
        });
    }

    checkStepTwo = () => {
        let isNameValid = (this.state.name !== ""),
            isAddressValid = this.validateEmail(),
            isGenderSelected = (this.state.gender !== ""),
            isBirthdaySelected = (this.state.dob !== ""),
            btnNextState = (isNameValid && isAddressValid && isGenderSelected && isBirthdaySelected);

        this.setState({
            isNextEnabled: btnNextState
        });
    }

    checkStepThree = () => {
        let isUsernameValid = this.validateUsername(),
            isPasswordValid = this.validatePassword(),
            isReentryValid = (this.state.password === this.state.passwordReentered),
            btnNextState = (isUsernameValid && isPasswordValid && isReentryValid)
        
        this.setState({
            isNextEnabled: btnNextState
        });
    }

    isStepOneComplete = (newState) => {
        this.setState(newState, () => {
            this.checkStepOne();
        });
    }

    isStepTwoComplete = (newState) => {
        this.setState(newState, () => {
            this.checkStepTwo();
        });
    }

    isStepThreeComplete = (newState) => {
        this.setState(newState, () => {
            this.checkStepThree();
        });
    }

    validateEmail = () => {
        // Source: https://www.w3resource.com/javascript/form/email-validation.php
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
        {
            return true;
        }
        return false;
    }

    validateUsername = () => {
        if(this.state.username.length >= 6)
        {
            let isAvailable = true;
            // Add backend call to check if username is already given
            return isAvailable;
        }
        return false;
    }

    validatePassword = () => {
        // Source: https://www.w3resource.com/javascript/form/password-validation.php
        let strength = "dark",
            isValid = false;
        if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(this.state.password))
        {
            strength = "success";
            isValid = true;
        }
        else
        {
            strength = (this.state.password.length > 0) ? "danger" : "dark";
        }

        this.setState({
            passwordStrength: strength
        });

        return isValid;
    }

    getDateToday = () => {
        // Source: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
        let today = new Date(),
            dd = String(today.getDate()).padStart(2, '0'),
            mm = String(today.getMonth() + 1).padStart(2, '0'), //January is 0!
            yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
    }

    render = () => {
        return <>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Registration</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => this.props.closeAction(false)}>
                            <IonIcon name="close" slot="icon-only"></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent
                className="ion-padding"
                scrollY={false}>
                <IonLabel>{this.state.indicativeLabel}</IonLabel>
                <IonProgressBar
                    value={this.state.progress}
                    buffer={this.state.progress + 0.25}/>
                <br />
                <IonSlides options={slideOpts}>
                    <IonSlide>
                        <IonList>
                            <IonRadioGroup
                                onIonChange={e => this.isStepOneComplete({
                                    role: e.target.value
                                })}>
                                <IonItem>
                                    <IonLabel>Patient or Doctor?</IonLabel>
                                </IonItem>

                                <IonItem lines="none">
                                    <IonLabel>Patient</IonLabel>
                                    <IonRadio slot="start" value="Patient" />
                                </IonItem>

                                <IonItem lines="none">
                                    <IonLabel>Doctor</IonLabel>
                                    <IonRadio slot="start" value="Doctor" />
                                </IonItem>
                            </IonRadioGroup>
                        </IonList>
                    </IonSlide>
                    <IonSlide>
                        <IonList>
                            <IonItem>
                                <IonLabel>Full Name</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    placeholder="Enter your name."
                                    value={this.state.name}
                                    onIonInput={e => this.isStepTwoComplete({
                                        name: e.target.value
                                    })}/>
                            </IonItem>
                            <br/>
                            <IonItem>
                                <IonLabel>Email Address</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    placeholder="Enter your email."
                                    value={this.state.email}
                                    onIonInput={e => this.isStepTwoComplete({
                                        email: e.target.value
                                    })}/>
                            </IonItem>
                            <br/>
                            <IonItem>
                                <IonLabel>Gender</IonLabel>
                            </IonItem>
                            <IonRadioGroup
                                onIonChange={e => this.isStepTwoComplete({
                                    gender: e.target.value
                                })}>
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
                            <br/>
                            <IonItem>
                                <IonLabel>Birthdate</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonDatetime
                                    placeholder="Select your date of birth."
                                    displayFormat="DD MMMM YYYY"
                                    pickerFormat="DD MMMM YYYY"
                                    max={this.getDateToday()}
                                    value={this.state.dob}
                                    onIonChange={e => this.isStepTwoComplete({
                                        dob: e.target.value
                                    })}/>
                            </IonItem>
                        </IonList>
                    </IonSlide>
                    <IonSlide>
                        <IonList>
                            <IonItem>
                                <IonLabel>Username</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonInput 
                                    placeholder="Enter your username."
                                    onIonChange={e => this.isStepThreeComplete({
                                        username: e.target.value
                                    })}/>
                            </IonItem>
                            <br/>
                            <IonItem>
                                <IonLabel>Password</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    type="password"
                                    placeholder="Enter your password."
                                    color={this.state.passwordStrength}
                                    onIonChange={e => this.isStepThreeComplete({
                                        password: e.target.value
                                    })}/>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    type="password"
                                    placeholder="Reenter your password."
                                    onIonChange={e => this.isStepThreeComplete({
                                        passwordReentered: e.target.value
                                    })}/>
                            </IonItem>
                        </IonList>
                    </IonSlide>
                    <IonSlide>
                        <IonList>
                            <IonItem>
                                <IonLabel>1. Role Selection</IonLabel>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Role: </IonLabel>
                                <IonNote slot="end">{this.state.role}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonLabel>2. Personal Details</IonLabel>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Name: </IonLabel>
                                <IonNote slot="end">{this.state.name}</IonNote>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Email: </IonLabel>
                                <IonNote slot="end">{this.state.email}</IonNote>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Gender: </IonLabel>
                                <IonNote slot="end">{this.state.gender}</IonNote>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Birthdate: </IonLabel>
                                <IonNote slot="end">{new Date(this.state.dob).toLocaleDateString()}</IonNote>
                            </IonItem>
                            <IonItem>
                                <IonLabel>3. Account Creation</IonLabel>
                            </IonItem>
                            <IonItem lines="none">
                                <IonLabel>Username: </IonLabel>
                                <IonNote slot="end">{this.state.username}</IonNote>
                            </IonItem>
                        </IonList>
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
                                disabled={!this.state.isNextEnabled}
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