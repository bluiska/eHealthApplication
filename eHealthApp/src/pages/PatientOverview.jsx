/*
Add description

Author: Daniel Madu
*/

import React, { useState, useEffect} from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonGrid,
  IonLabel,
  IonIcon,
  IonTitle,
  IonButton,
  IonToolbar,
  IonCardHeader,
  IonSpinner,
  IonCardTitle
} from "@ionic/react";
import { heart, options } from "ionicons/icons";
import BackButtonToolbar from "../components/BackButtonToolbar";
import FilterOverview from "./FilterOverview";
import { Accordion, Row, Col, Image, Container } from "react-bootstrap";
import {withRouter} from 'react-router-dom'

import exercise_img from "../resources/exercise.jpg";
import weight_img from "../resources/weight_scale.jpg";
import walk_img from "../resources/walk.png";
import run_img from "../resources/run.png";
import cycle_img from "../resources/cycle.png";
import ActivityQueries from "../queries/ActivityQueries";

/*props:
 */

const PatientOverview = props => {


  useEffect(() => {
    ActivityQueries.getActivitiesByDateRange(props.match.params.patientid, "2020-03-14", "2020-03-14").then(res => {
      console.log(res)
    })
  }, [])



  const [counter, setCounter] = useState(2);

  const todaysDate = new Date();
  const [userData, setUserData] = useState([
    {
      id: "activity1",
      name: "Blood pressure",
      value: "120 mmHg",
      date: "Thu Mar 12 2020",
      time: "17:41"
    },
    {
      id: "activity2",
      name: "Blood pressure",
      value: "130 mmHg",
      date: "Thu Mar 12 2020",
      time: "15:31"
    },
    {
      id: "activity3",
      name: "Cycle",
      value: "20 mins",
      date: "Thu Mar 12 2020",
      time: "13:21"
    },
    {
      id: "activity4",
      name: "Run",
      value: "25 mins",
      date: "Thu Mar 12 2020",
      time: "14:11"
    },
    {
      id: "activity5",
      name: "Blood pressure",
      value: "135 mmHg",
      date: "Wed Mar 11 2020",
      time: "05:43"
    },
    {
      id: "activity6",
      name: "Blood pressure",
      value: "140 mmHg",
      date: "Wed Mar 11 2020",
      time: "16:31"
    }
  ]);

  const moreData = [
    {
      id: "activity7",
      name: "Blood pressure",
      value: "140 mmHg",
      date: "Tue Mar 10 2020",
      time: "16:21"
    },
    {
      id: "activity8",
      name: "Run",
      value: "25 mins",
      date: "Tue Mar 10 2020",
      time: "14:11"
    },
    {
      id: "activity9",
      name: "Cycle",
      value: "20 mins",
      date: "Mon Mar 09 2020",
      time: "13:21"
    },
    {
      id: "activity10",
      name: "Blood pressure",
      value: "140 mmHg",
      date: "Mon Mar 09 2020",
      time: "16:21"
    },
    {
      id: "activity11",
      name: "Run",
      value: "25 mins",
      date: "Sun Mar 08 2020",
      time: "14:11"
    },
    {
      id: "activity12",
      name: "Run",
      value: "25 mins",
      date: "Sun Mar 08 2020",
      time: "14:11"
    },
    {
      id: "activity13",
      name: "Blood pressure",
      value: "140 mmHg",
      date: "Sat Mar 07 2020",
      time: "16:21"
    },
    {
      id: "activity14",
      name: "Cycle",
      value: "20 mins",
      date: "Sat Mar 07 2020",
      time: "13:21"
    },
    {
      id: "activity15",
      name: "Run",
      value: "25 mins",
      date: "Fri Mar 06 2020",
      time: "14:11"
    },
    {
      id: "activity16",
      name: "Run",
      value: "25 mins",
      date: "Fri Mar 06 2020",
      time: "14:11"
    }
  ];

  let yesterdaysDate = new Date(todaysDate);
  yesterdaysDate.setDate(todaysDate.getDate() - 1);

  let searchDate = new Date(todaysDate);
  searchDate.setDate(todaysDate.getDate() - counter);

  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedDateFilter, setSelectedDateFilterHandler] = useState(
    new Date("1970-01-01Z00:00:00:000")
  );
  const [displayFilter, setDisplayFilter] = useState(false);

  const dataForToday = userData.filter(
    val => val.date === todaysDate.toDateString()
  );
  const dataForYesterday = userData.filter(
    val => val.date === yesterdaysDate.toDateString()
  );
  const [restOfTheData, setRestOFTheData] = useState([]);

  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);

  const styles = {
    activity: {
      display: "inline-block"
    },
    icon: {
      float: "left"
    },
    title: {
      float: "center"
    },
    value: {
      float: "right"
    },
    filter: {
      width: "20%"
    },
    iconimg: {
      width: "20px",
      height: "20px",
      margin: "auto"
    },
    show: {
      width: "60%",
      margin: "0 auto",
      marginTop: "7%"
    },
    loadingSpinner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  };

  const RecordCard = props => {
    return (
      <Accordion>
        <IonCard key={props.index}>
          <Accordion.Toggle as={IonCardHeader} eventKey={props.index}>
            <Row className="align-content-center justify-content-center">
              <Col xs="3">
                {props.data.name === "Blood pressure" && (
                  <div style={styles.iconimg}>
                    <IonIcon icon={heart} style={styles.iconimg} />
                  </div>
                )}
                {props.data.name === "Cycle" && (
                  <Image src={cycle_img} style={styles.iconimg} />
                )}
                {props.data.name === "Run" && (
                  <Image src={run_img} style={styles.iconimg} />
                )}
              </Col>
              <Col xs="7">
                <IonLabel style={styles.title}>
                  <h2>{props.data.name}</h2>
                </IonLabel>
              </Col>
              <Col xs="2">
                <IonLabel style={styles.value}>
                  <h3>{props.data.value}</h3>
                </IonLabel>
              </Col>
            </Row>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey={props.index}>
            <IonCardContent>
              <IonLabel>Date: {props.data.date}</IonLabel>
              <IonLabel>Time: {props.data.time}</IonLabel>
            </IonCardContent>
          </Accordion.Collapse>
        </IonCard>
      </Accordion>
    );
  };

  const setSelectedFilterHandler = value => {
    if (!selectedFilter.includes(value)) {
      // adds value to the array (select)
      setSelectedFilter([...selectedFilter, value]);
    } else {
      // removes the value from the array (unselect)
      const res = selectedFilter.filter(item => item !== value);
      setSelectedFilter(res);
    }
  };

  const loadMoreData = () => {
    setLoading(true);
    const results = moreData.filter(
      val => val.date === searchDate.toDateString()
    ); // the api call to the backend show be made here
	setDates([...dates, searchDate.toDateString()]);
	setRestOFTheData([...restOfTheData, ...results]);
    
    setLoading(false);
    setCounter(counter + 1);
    searchDate.setDate(todaysDate.getDate() - counter);
  };

  function filterYear(date) {
    // ((new Date(v.date.split(' ')[3], 4, v.date.split(' ')[2]) <= todaysDate)
    // && (new Date(v.date.split(' ')[3], 4, v.date.split(' ')[2]) > selectedDateFilter))

    const dateArray = date.split(" ");
    console.log(dateArray);
    const dateObj = new Date(dateArray[3], 2, dateArray[2]);
    console.log("OBJ DATE:", dateObj);

    console.log("SELECTED DATE:", selectedDateFilter);

    return dateObj > selectedDateFilter;
  }

  return (
    <IonPage>
      {!displayFilter && (
        <BackButtonToolbar title={"Patient Name's " + "Overview"} />
      )}
      <IonToolbar>
        {displayFilter && <IonTitle>Filter by</IonTitle>}

        {!displayFilter && (
          <IonButton
            size="large"
            expand="block"
            onClick={() => setDisplayFilter(!displayFilter)}
          >
            <IonIcon icon={options} />
            <IonTitle>Filter</IonTitle>
          </IonButton>
        )}
      </IonToolbar>
      <IonContent className="ion-padding">
        {console.log("DATEFILTER PO: ", selectedDateFilter)}
        {displayFilter && (
          <FilterOverview
            selectedDateFilter={selectedDateFilter}
            selectedFilter={selectedFilter}
            setSelectedDateFilterHandler={setSelectedDateFilterHandler}
            setSelectedFilterHandler={setSelectedFilterHandler}
            setDisplayFilter={setDisplayFilter}
          />
        )}
        {!displayFilter && (
          <IonList>
            {dataForToday.length !== 0 && (
              <IonItem>
                <IonGrid>
                  <IonTitle>Today</IonTitle>
                  {dataForToday
                    .filter(
                      val =>
                        selectedFilter.includes(val.name) ||
                        selectedFilter.length === 0
                    )
                    .map(
                      data =>
                        data.date === todaysDate.toDateString() && (
                          <RecordCard
                            index={data.id}
                            key={data.id}
                            data={data}
                          />
                        )
                    )}
                </IonGrid>
              </IonItem>
            )}
            {dataForYesterday.length !== 0 && (
              <IonItem>
                <IonGrid>
                  <IonTitle>Yesterday</IonTitle>
                  {dataForYesterday
                    .filter(
                      val =>
                        selectedFilter.includes(val.name) ||
                        selectedFilter.length === 0
                    )
                    .map(
                      data =>
                        data.date === yesterdaysDate.toDateString() && (
                          <RecordCard
                            index={data.id}
                            key={data.id}
                            data={data}
                          />
                        )
                    )}
                </IonGrid>
              </IonItem>
            )}
            {/* {(restOfTheData.length !== 0) &&
								<IonItem>
									<IonGrid>
										<IonTitle>Past activities</IonTitle>
										{restOfTheData
										.filter(val => selectedFilter.includes(val.name) || selectedFilter.length === 0)
										.map((data) => <RecordCard index={data.id} key={data.id} data={data}/>)}
									</IonGrid>
								</IonItem>	
							} */}
            {console.log("Selected Year: ", selectedDateFilter)}
            {/* {console.log("Today: ", todaysDate.getUTCFullYear())} */}
            {dates.length !== 0 &&
              dates.map((date, index) => (
                <IonItem key={index}>
                  <IonGrid>
                    <IonTitle>{date.substring(0, date.length - 5)}</IonTitle>
                    {console.log(todaysDate)}
					{(restOfTheData
					.filter(v => v.date === date && filterYear(v.date))
					.length === 0
					&&
					filterYear(date) !== true
					&&
					<IonCard>
						<IonCardHeader>
							<IonCardTitle>No activity for this day</IonCardTitle>
						</IonCardHeader>
				  	</IonCard>
					)

					||
					
					restOfTheData
                      .filter(
                        val =>
                          selectedFilter.includes(val.name) ||
                          selectedFilter.length === 0
                      )
                      .filter(v => v.date === date && filterYear(v.date))
                      .map(data => (
                        <RecordCard index={data.id} key={data.id} data={data} />
                      ))}
                  </IonGrid>
                </IonItem>
              ))}

            {loading && (
              <div style={styles.loadingSpinner}>
                <IonSpinner name="crescent" />
              </div>
            )}

            <Container>
              <Row className="justify-content-center">
                <Col xs="8">
                  <IonButton
                    size="small"
                    expand="block"
                    fill="outline"
                    style={styles.show}
                    onClick={() => loadMoreData()}
                  >
                    Show more
                  </IonButton>
                </Col>
              </Row>
            </Container>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};
export default withRouter(PatientOverview);


/*

todaysANdYesterdaysData = Query.data()

<IonList>



[[today] [yesterday] [yesterday - 1] [yesterday - n]

todaysANdyYesterdaysData.map(day => {

  if(day.length === 0){
    render no activity card
  } else {
    day.map(activity => {
      render the activity card
    })
  }
})

</IonList>

*/