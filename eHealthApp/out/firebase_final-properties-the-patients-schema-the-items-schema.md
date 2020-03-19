# The Items Schema Schema

```txt
#/properties/patients/items#/properties/patients/items
```

An explanation about the purpose of this instance.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | --------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [firebase_final.schema.json\*](firebase_final.schema.json "open original schema") |

## items Type

`object` ([The Items Schema](firebase_final-properties-the-patients-schema-the-items-schema.md))

## items Default Value

The default value is:

```json
{}
```

## items Examples

```json
{
  "email": "jonathan.wills70@outlook.co.uk",
  "dob": "1970-02-05T00:00:00Z",
  "id": "TestPatient-1",
  "name": "Jonathan Wills",
  "doctor": "TestDoctor-1",
  "gender": "Male"
}
```

# The Items Schema Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                      |
| :---------------- | -------- | -------- | -------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dob](#dob)       | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-dob-schema.md "\#/properties/patients/items/properties/dob#/properties/patients/items/properties/dob")          |
| [doctor](#doctor) | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-doctor-schema.md "\#/properties/patients/items/properties/doctor#/properties/patients/items/properties/doctor") |
| [email](#email)   | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-email-schema.md "\#/properties/patients/items/properties/email#/properties/patients/items/properties/email")    |
| [gender](#gender) | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-gender-schema.md "\#/properties/patients/items/properties/gender#/properties/patients/items/properties/gender") |
| [id](#id)         | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-id-schema.md "\#/properties/patients/items/properties/id#/properties/patients/items/properties/id")             |
| [name](#name)     | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-name-schema.md "\#/properties/patients/items/properties/name#/properties/patients/items/properties/name")       |

## dob

An explanation about the purpose of this instance.


`dob`

-   is required
-   Type: `string` ([The Dob Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-dob-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-dob-schema.md "\#/properties/patients/items/properties/dob#/properties/patients/items/properties/dob")

### dob Type

`string` ([The Dob Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-dob-schema.md))

### dob Examples

```json
"1970-02-05T00:00:00Z"
```

## doctor

An explanation about the purpose of this instance.


`doctor`

-   is required
-   Type: `string` ([The Doctor Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-doctor-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-doctor-schema.md "\#/properties/patients/items/properties/doctor#/properties/patients/items/properties/doctor")

### doctor Type

`string` ([The Doctor Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-doctor-schema.md))

### doctor Examples

```json
"TestDoctor-1"
```

## email

An explanation about the purpose of this instance.


`email`

-   is required
-   Type: `string` ([The Email Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-email-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-email-schema.md "\#/properties/patients/items/properties/email#/properties/patients/items/properties/email")

### email Type

`string` ([The Email Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-email-schema.md))

### email Examples

```json
"jonathan.wills70@outlook.co.uk"
```

## gender

An explanation about the purpose of this instance.


`gender`

-   is required
-   Type: `string` ([The Gender Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-gender-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-gender-schema.md "\#/properties/patients/items/properties/gender#/properties/patients/items/properties/gender")

### gender Type

`string` ([The Gender Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-gender-schema.md))

### gender Examples

```json
"Male"
```

## id

An explanation about the purpose of this instance.


`id`

-   is required
-   Type: `string` ([The Id Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-id-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-id-schema.md "\#/properties/patients/items/properties/id#/properties/patients/items/properties/id")

### id Type

`string` ([The Id Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-id-schema.md))

### id Examples

```json
"TestPatient-1"
```

## name

An explanation about the purpose of this instance.


`name`

-   is required
-   Type: `string` ([The Name Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-name-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-name-schema.md "\#/properties/patients/items/properties/name#/properties/patients/items/properties/name")

### name Type

`string` ([The Name Schema](firebase_final-properties-the-patients-schema-the-items-schema-properties-the-name-schema.md))

### name Examples

```json
"Jonathan Wills"
```
