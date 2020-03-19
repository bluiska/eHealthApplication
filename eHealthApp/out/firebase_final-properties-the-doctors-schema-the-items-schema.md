# The Items Schema Schema

```txt
#/properties/doctors/items#/properties/doctors/items
```

An explanation about the purpose of this instance.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | --------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [firebase_final.schema.json\*](firebase_final.schema.json "open original schema") |

## items Type

`object` ([The Items Schema](firebase_final-properties-the-doctors-schema-the-items-schema.md))

## items Default Value

The default value is:

```json
{}
```

## items Examples

```json
{
  "gender": "Female",
  "name": "Dr. Madeleine Girard",
  "email": "madeleine.girard@ehs.com",
  "dob": "1995-11-01T00:00:00Z",
  "id": "TestDoctor-1"
}
```

# The Items Schema Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                   |
| :---------------- | -------- | -------- | -------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dob](#dob)       | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-dob-schema.md "\#/properties/doctors/items/properties/dob#/properties/doctors/items/properties/dob")          |
| [email](#email)   | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-email-schema.md "\#/properties/doctors/items/properties/email#/properties/doctors/items/properties/email")    |
| [gender](#gender) | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-gender-schema.md "\#/properties/doctors/items/properties/gender#/properties/doctors/items/properties/gender") |
| [id](#id)         | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-id-schema.md "\#/properties/doctors/items/properties/id#/properties/doctors/items/properties/id")             |
| [name](#name)     | `string` | Required | cannot be null | [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-name-schema.md "\#/properties/doctors/items/properties/name#/properties/doctors/items/properties/name")       |

## dob

An explanation about the purpose of this instance.


`dob`

-   is required
-   Type: `string` ([The Dob Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-dob-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-dob-schema.md "\#/properties/doctors/items/properties/dob#/properties/doctors/items/properties/dob")

### dob Type

`string` ([The Dob Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-dob-schema.md))

### dob Examples

```json
"1995-11-01T00:00:00Z"
```

## email

An explanation about the purpose of this instance.


`email`

-   is required
-   Type: `string` ([The Email Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-email-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-email-schema.md "\#/properties/doctors/items/properties/email#/properties/doctors/items/properties/email")

### email Type

`string` ([The Email Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-email-schema.md))

### email Examples

```json
"madeleine.girard@ehs.com"
```

## gender

An explanation about the purpose of this instance.


`gender`

-   is required
-   Type: `string` ([The Gender Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-gender-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-gender-schema.md "\#/properties/doctors/items/properties/gender#/properties/doctors/items/properties/gender")

### gender Type

`string` ([The Gender Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-gender-schema.md))

### gender Examples

```json
"Female"
```

## id

An explanation about the purpose of this instance.


`id`

-   is required
-   Type: `string` ([The Id Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-id-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-id-schema.md "\#/properties/doctors/items/properties/id#/properties/doctors/items/properties/id")

### id Type

`string` ([The Id Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-id-schema.md))

### id Examples

```json
"TestDoctor-1"
```

## name

An explanation about the purpose of this instance.


`name`

-   is required
-   Type: `string` ([The Name Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-name-schema.md))
-   cannot be null
-   defined in: [The Root Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-name-schema.md "\#/properties/doctors/items/properties/name#/properties/doctors/items/properties/name")

### name Type

`string` ([The Name Schema](firebase_final-properties-the-doctors-schema-the-items-schema-properties-the-name-schema.md))

### name Examples

```json
"Dr. Madeleine Girard"
```
