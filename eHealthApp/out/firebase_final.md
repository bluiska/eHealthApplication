# The Root Schema Schema

```txt
http://example.com/example.json
```

The root schema comprises the entire JSON document.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                      |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [firebase_final.schema.json](firebase_final.schema.json "open original schema") |

## The Root Schema Type

`object` ([The Root Schema](firebase_final.md))

# The Root Schema Properties

| Property                  | Type     | Required | Nullable       | Defined by                                                                                                              |
| :------------------------ | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------- |
| [activities](#activities) | `object` | Optional | cannot be null | [The Root Schema](firebase_final-properties-the-activities-schema.md "\#/properties/activities#/properties/activities") |
| [doctors](#doctors)       | `array`  | Optional | cannot be null | [The Root Schema](firebase_final-properties-the-doctors-schema.md "\#/properties/doctors#/properties/doctors")          |
| [patients](#patients)     | `array`  | Optional | cannot be null | [The Root Schema](firebase_final-properties-the-patients-schema.md "\#/properties/patients#/properties/patients")       |

## activities

The activities object stores all activities for all patient. Individual patients are added by their patientID.


`activities`

-   is optional
-   Type: `object` ([The Activities Schema](firebase_final-properties-the-activities-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-activities-schema.md "\#/properties/activities#/properties/activities")

### activities Type

`object` ([The Activities Schema](firebase_final-properties-the-activities-schema.md))

### activities Default Value

The default value is:

```json
{}
```

### activities Examples

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

## doctors

An explanation about the purpose of this instance.


`doctors`

-   is optional
-   Type: `object[]` ([The Items Schema](firebase_final-properties-the-doctors-schema-the-items-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-doctors-schema.md "\#/properties/doctors#/properties/doctors")

### doctors Type

`object[]` ([The Items Schema](firebase_final-properties-the-doctors-schema-the-items-schema.md))

### doctors Default Value

The default value is:

```json
[]
```

## patients

An explanation about the purpose of this instance.


`patients`

-   is optional
-   Type: `object[]` ([The Items Schema](firebase_final-properties-the-patients-schema-the-items-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-patients-schema.md "\#/properties/patients#/properties/patients")

### patients Type

`object[]` ([The Items Schema](firebase_final-properties-the-patients-schema-the-items-schema.md))

### patients Default Value

The default value is:

```json
[]
```
