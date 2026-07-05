const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_courses', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Define Schemas
const courseSchema = new mongoose.Schema({
	title: String,
	description: String,
});

const studentSchema = new mongoose.Schema({
	name: String,
	email: String,
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

// Define Models
const Course = mongoose.model('Course', courseSchema);
const Student = mongoose.model('Student', studentSchema);

// CRUD for Courses
app.post('/courses', async (req, res) => {
	try {
		const course = new Course(req.body);
		await course.save();
		res.status(201).json(course);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.get('/courses', async (req, res) => {
	const courses = await Course.find();
	res.json(courses);
});

app.get('/courses/:id', async (req, res) => {
	try {
		const course = await Course.findById(req.params.id);
		if (!course) return res.status(404).json({ error: 'Course not found' });
		res.json(course);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.put('/courses/:id', async (req, res) => {
	try {
		const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!course) return res.status(404).json({ error: 'Course not found' });
		res.json(course);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.delete('/courses/:id', async (req, res) => {
	try {
		const course = await Course.findByIdAndDelete(req.params.id);
		if (!course) return res.status(404).json({ error: 'Course not found' });
		res.json({ message: 'Course deleted' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// CRUD for Students
app.post('/students', async (req, res) => {
	try {
		const student = new Student(req.body);
		await student.save();
		res.status(201).json(student);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.get('/students', async (req, res) => {
	const students = await Student.find().populate('courses');
	res.json(students);
});

app.get('/students/:id', async (req, res) => {
	try {
		const student = await Student.findById(req.params.id).populate('courses');
		if (!student) return res.status(404).json({ error: 'Student not found' });
		res.json(student);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.put('/students/:id', async (req, res) => {
	try {
		const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!student) return res.status(404).json({ error: 'Student not found' });
		res.json(student);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.delete('/students/:id', async (req, res) => {
	try {
		const student = await Student.findByIdAndDelete(req.params.id);
		if (!student) return res.status(404).json({ error: 'Student not found' });
		res.json({ message: 'Student deleted' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}: http://localhost:${PORT}`);
});
