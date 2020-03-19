# The Patient Activity Schema Schema

```txt
#/properties/activities/properties/TestPatient-1#/properties/activities/properties/TestPatient-1
```

Patient activities are added using the IDs of the patients. The activities of a patient are divided by day. Each day may contain many different types of activities. The appending of an activity should conform to the date formatting DD-MM-YYYY (see example)


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | --------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [firebase_final.schema.json\*](firebase_final.schema.json "open original schema") |

## TestPatient-1 Type

`object` ([The Patient Activity Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema.md))

## TestPatient-1 Default Value

The default value is:

```json
{}
```

## TestPatient-1 Examples

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

# The Patient Activity Schema Properties

| Property                  | Type    | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                                    |
| :------------------------ | ------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [17-03-2020](#17-03-2020) | `array` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020#/properties/activities/properties/TestPatient-1/properties/17-03-2020") |

## 17-03-2020

A date to hold activities of the user.


`17-03-2020`

-   is required
-   Type: `object[]` ([The Items Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020#/properties/activities/properties/TestPatient-1/properties/17-03-2020")

### 17-03-2020 Type

`object[]` ([The Items Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema.md))

### 17-03-2020 Default Value

The default value is:

```json
[]
```
