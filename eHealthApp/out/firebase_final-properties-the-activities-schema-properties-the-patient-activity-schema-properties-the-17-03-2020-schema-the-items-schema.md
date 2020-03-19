# The Items Schema Schema

```txt
#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items
```

Each activity can be listed under a date.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | --------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [firebase_final.schema.json\*](firebase_final.schema.json "open original schema") |

## items Type

`object` ([The Items Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema.md))

## items Default Value

The default value is:

```json
{}
```

## items Examples

```json
{
  "startTime": 1584437409859,
  "caloriesBurnt": 139.25,
  "type": "walk",
  "endTime": 1584439836571,
  "distance": 3.9,
  "steps": 8750,
  "timestamp": 1584439836571
}
```

# The Items Schema Properties

| Property                        | Type      | Required | Nullable       | Defined by                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------------ | --------- | -------- | -------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [caloriesBurnt](#caloriesBurnt) | `number`  | Required | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-caloriesburnt-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/caloriesBurnt#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/caloriesBurnt") |
| [distance](#distance)           | `number`  | Required | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-distance-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/distance#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/distance")                |
| [endTime](#endTime)             | `integer` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-endtime-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/endTime#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/endTime")                   |
| [startTime](#startTime)         | `integer` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-starttime-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/startTime#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/startTime")             |
| [steps](#steps)                 | `integer` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-steps-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/steps#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/steps")                         |
| [timestamp](#timestamp)         | `integer` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-timestamp-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/timestamp#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/timestamp")             |
| [type](#type)                   | `string`  | Required | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-type-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/type#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/type")                            |

## caloriesBurnt

An explanation about the purpose of this instance.


`caloriesBurnt`

-   is required
-   Type: `number` ([The Caloriesburnt Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-caloriesburnt-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-caloriesburnt-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/caloriesBurnt#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/caloriesBurnt")

### caloriesBurnt Type

`number` ([The Caloriesburnt Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-caloriesburnt-schema.md))

### caloriesBurnt Examples

```json
139.25
```

## distance

An explanation about the purpose of this instance.


`distance`

-   is required
-   Type: `number` ([The Distance Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-distance-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-distance-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/distance#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/distance")

### distance Type

`number` ([The Distance Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-distance-schema.md))

### distance Examples

```json
3.9
```

## endTime

An explanation about the purpose of this instance.


`endTime`

-   is required
-   Type: `integer` ([The Endtime Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-endtime-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-endtime-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/endTime#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/endTime")

### endTime Type

`integer` ([The Endtime Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-endtime-schema.md))

### endTime Examples

```json
1584439836571
```

## startTime

An explanation about the purpose of this instance.


`startTime`

-   is required
-   Type: `integer` ([The Starttime Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-starttime-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-starttime-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/startTime#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/startTime")

### startTime Type

`integer` ([The Starttime Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-starttime-schema.md))

### startTime Examples

```json
1584437409859
```

## steps

An explanation about the purpose of this instance.


`steps`

-   is required
-   Type: `integer` ([The Steps Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-steps-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-steps-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/steps#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/steps")

### steps Type

`integer` ([The Steps Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-steps-schema.md))

### steps Examples

```json
8750
```

## timestamp

An explanation about the purpose of this instance.


`timestamp`

-   is required
-   Type: `integer` ([The Timestamp Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-timestamp-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-timestamp-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/timestamp#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/timestamp")

### timestamp Type

`integer` ([The Timestamp Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-timestamp-schema.md))

### timestamp Examples

```json
1584439836571
```

## type

An explanation about the purpose of this instance.


`type`

-   is required
-   Type: `string` ([The Type Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-type-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-type-schema.md "\#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/type#/properties/activities/properties/TestPatient-1/properties/17-03-2020/items/properties/type")

### type Type

`string` ([The Type Schema](firebase_final-properties-the-activities-schema-properties-the-patient-activity-schema-properties-the-17-03-2020-schema-the-items-schema-properties-the-type-schema.md))

### type Examples

```json
"walk"
```
