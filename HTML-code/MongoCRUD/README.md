# Student Courses Database - MongoDB Shell Guide

This guide helps you handle data transactions for the Student Courses Database using the MongoDB shell.

## 1. Start MongoDB Shell

Open your terminal and run:
```
mongo
```

## 2. Switch to Database

```
use student_courses
```

## 3. Insert Data

### Insert a Course
```
db.courses.insertOne({
  title: "Mathematics",
  description: "Basic math course"
})
```

### Insert a Student
```
db.students.insertOne({
  name: "John Doe",
  email: "john@example.com",
  courses: [] // Add course ObjectIds here
})
```

## 4. Find Data

### Find All Courses
```
db.courses.find()
```

### Find All Students
```
db.students.find()
```

## 5. Update Data

### Add a Course to a Student
```
db.students.updateOne(
  { _id: ObjectId("STUDENT_ID") },
  { $push: { courses: ObjectId("COURSE_ID") } }
)
```

## 6. Delete Data

### Delete a Course
```
db.courses.deleteOne({ _id: ObjectId("COURSE_ID") })
```

### Delete a Student
```
db.students.deleteOne({ _id: ObjectId("STUDENT_ID") })
```

## 7. View Students with Courses

To manually join data, use aggregation:
```
db.students.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "courses",
      foreignField: "_id",
      as: "courseDetails"
    }
  }
])
```

---

# MongoDB Database Name

The application connects to the following MongoDB database:

```
student_courses
```

This is specified in the connection string in `server.js`:

```js
mongoose.connect('mongodb://localhost:27017/student_courses', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
```

All student and course data will be stored in the `student_courses` database.  
You can interact with this database using the MongoDB shell or other MongoDB tools.

**Note:** Replace `"STUDENT_ID"` and `"COURSE_ID"` with actual ObjectId values.

For more advanced queries, refer to the [MongoDB documentation](https://docs.mongodb.com/manual/).