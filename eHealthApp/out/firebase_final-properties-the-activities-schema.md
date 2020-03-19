# The Activities Schema Schema

```txt
#/properties/activities#/properties/activities
```

The activities object stores all activities for all patient. Individual patients are added by their patientID.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | --------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [firebase_final.schema.json\*](firebase_final.schema.json "open original schema") |

## activities Type

`object` ([The Activities Schema](firebase_final-properties-the-activities-schema.md))

## activities Default Value

The default value is:

```json
{}
```

## activities Examples

```json
{
  "TestPatient-1": {
    "17-03-2020": [
      {
        "endTime": 1584439836571,
        "distance": 3.9,
        "steps": 8750,
        "timestamp": 1584439836571,
        "startTime": 1584437409859,
        "caloriesBurnt": 139.25,
        "type": "walk"
      }
    ]
  }
}
```

# The Activities Schema Properties

| Property                        | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                       |
| :------------------------------ | -------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [TestPatient-1](#TestPatient-1) | `object` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema.md "\#/properties/activities/properties/TestPatient-1#/properties/activities/properties/TestPatient-1") |

## TestPatient-1

Patient activities are added using the IDs of the patients. The activities of a patient are divided by day. Each day may contain many different types of activities. The appending of an activity should conform to the date formatting DD-MM-YYYY (see example)


`TestPatient-1`

-   is required
-   Type: `object` ([The Patient Activity Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema.md "\#/properties/activities/properties/TestPatient-1#/properties/activities/properties/TestPatient-1")

### TestPatient-1 Type

`object` ([The Patient Activity Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema.md))

### TestPatient-1 Default Value

The default value is:

```json
{}
```

### TestPatient-1 Examples

```json
{
  "17-03-2020": [
    {
      "steps": 8750,
      "distance": 3.9,
      "timestamp": 1584439836571,
      "caloriesBurnt": 139.25,
      "startTime": 1584437409859,
      "type": "walk",
      "endTime": 1584439836571
    }
  ]
}
```
