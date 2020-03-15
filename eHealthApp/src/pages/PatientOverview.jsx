/*
Add description

Author: Daniel Madu
*/

import React, { useState, useEffect } from "react";
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
  IonCardTitle,
  IonListHeader
} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import FilterOverview from "./FilterOverview";
import { Accordion, Row, Col, Image, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import RecordCard from "../components/record_cards/RecordCard";

import { options } from "ionicons/icons";
import exercise_img from "../resources/exercise.jpg";
import weight_img from "../resources/weight_scale.jpg";
import ActivityQueries from "../queries/ActivityQueries";
import UserQueries from "../queries/UserQueries";
import { get } from "http";
import { act } from "react-dom/test-utils";

/*props:
 */

const PatientOverview = props => {
  //State
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedDateFilter, setSelectedDateFilterHandler] = useState(
    new Date("1970-01-01Z00:00:00:000")
  );
  const [displayFilter, setDisplayFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activityList, setActivityList] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const today = new Date();

  const yesterday = () => {
    let yesterdaysDate = new Date(today);
    yesterdaysDate.setDate(today.getDate() - 1);
    return yesterdaysDate;
  };

  const patientId = props.match.params.patientid;
  const patientName = props.match.params.patientname;

  /**
   to - 12th of March

   from - 9th of March

   (show more)

   query( from - 1);
   append to array of activities
    
   */

  const getActivities = (from, to) => {
    let activities = {};

    let toDate = new Date(to);
    for (var d = new Date(from); d <= toDate; d.setDate(d.getDate() + 1)) {
      activities[d.toDateString()] = [];
    }

    ActivityQueries.getActivitiesByDateRange(
      patientId,
      new Date(from).toISOString().slice(0, 10),
      new Date(to).toISOString().slice(0, 10)
    ).then(res => {
      //Separate into dates...
      res.map(activity => {
        let date = new Date(activity.timestamp).toDateString();
        activities[date].push(activity);
      });

      let sortedActivities = Object.entries(activities).sort((a, b) => {
        let aDate = new Date(a[0]);
        let bDate = new Date(b[0]);
        return aDate > bDate ? -1 : 1;
      });

      setActivityList(sortedActivities);
    });
  };

  /**
   *
   * @param {string} date //The date a .toDateString format
   */
  const appendPreviousActivity = date => {
    let activities = [...activityList];

    console.log("APPENDING: ", activities);

    ActivityQueries.getActivitiesByDateRange(
      patientId,
      new Date(date).toISOString().slice(0, 10),
      new Date(date).toISOString().slice(0, 10)
    ).then(res => {
      //Separate into dates...

      if (res.length > 0) {
        res.map(activity => {
          let date = new Date(activity.timestamp).toDateString();
          activities.push([date, activity]);
        });
      } else {
        activities.push([date, []]);
      }

      setActivityList(activities);
    });
  };

  useEffect(() => {
    let todayString = today.toDateString();
    let yesterdayString = yesterday().toDateString();

    console.log(todayString, yesterdayString);

    setFrom(yesterdayString);
    setTo(todayString);

    getActivities(yesterdayString, todayString);
  }, []);

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
    console.log("Loading: ", loading);
    // the api call to the backend show be made here
    let dayBeforeFrom = new Date(from);
    dayBeforeFrom.setDate(dayBeforeFrom.getDate() - 1);
    appendPreviousActivity(dayBeforeFrom.toDateString());
    setFrom(dayBeforeFrom);
    setLoading(false);
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

  const dateTitle = date => {
    let displayDate = new Date(date);
    if (displayDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (displayDate.toDateString() === yesterday().toDateString()) {
      return "Yesterday";
    }
    return date;
  };

  const filterByActivityType = act => {
    return (
      selectedFilter.includes(act.id.split("_")[0]) ||
      selectedFilter.length === 0
    );
  };

  const filterByDate = act => {
    return new Date(act) > selectedDateFilter;
  };

  return (
    <IonPage>
      {!displayFilter && (
        <BackButtonToolbar title={`${patientName}'s Overview`} />
      )}
      {/* Filter button */}
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
      <IonContent>
        {/* Filter Screen */}
        {displayFilter && (
          <FilterOverview
            selectedDateFilter={selectedDateFilter}
            selectedFilter={selectedFilter}
            setSelectedDateFilterHandler={setSelectedDateFilterHandler}
            setSelectedFilterHandler={setSelectedFilterHandler}
            setDisplayFilter={setDisplayFilter}
          />
        )}
        {/* Main Content */}
        {!displayFilter && (
          <IonList lines="inset">
            {/* Load the activities */}
            {activityList.length > 0 &&
              activityList
                .filter(dateVal => filterByDate(dateVal[0]))
                .map(date => {
                  return (
                    <IonItem key={date[0]}>
                      <Container>
                        <Row>
                          <Col>
                            <IonTitle>{dateTitle(date[0])}</IonTitle>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {date[1].length === 0 ||
                            date[1].filter(act => filterByActivityType(act))
                              .length === 0 ? (
                              <IonCard>
                                <IonCardHeader>
                                  <IonLabel
                                    style={{
                                      textAlign: "center",
                                      fontSize: "1.2em"
                                    }}
                                  >
                                    No activity for this day
                                  </IonLabel>
                                </IonCardHeader>
                              </IonCard>
                            ) : (
                              date[1]
                                .filter(act => filterByActivityType(act))
                                .map(activity => {
                                  return (
                                    <RecordCard
                                      key={activity.id}
                                      index={activity.id}
                                      data={activity}
                                    />
                                  );
                                })
                            )}
                          </Col>
                        </Row>
                      </Container>
                    </IonItem>
                  );
                })}

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
                    onClick={() => {
                      loadMoreData();
                    }}
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

[[today] [yesterday] yesterday - 1] [yesterday - n]]

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

/*

					<IonCard>
						<IonCardHeader>
							<IonCardTitle>No activity for this day</IonCardTitle>
						</IonCardHeader>
				  	</IonCard>


<RecordCard index={data.id} key={data.id} data={data} />

*/
