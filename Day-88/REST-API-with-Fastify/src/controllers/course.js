const Course = require("../model/Course");

exports.getCourse = async( request, reply )=>{
    try {
        const courses = await Course.find();
        return courses;

    } catch (error) {
        throw error;
    }
};

// get a single course...
exports.getACourse = async( request, reply )=>{
    try {
        const courseId = request.params.courseId;
        const courses = await Course.findById( courseId );

        return courses;
    } catch (error) {
        throw error;
    }
};

// Add a new course..
exports.addCourse = async( request, reply )=>{
    try {
        const course = new Course( request.body );
        return course.save();
    } catch (error) {
        throw error;
    }
};

// update
exports.updateCourse = async( request, reply )=>{
    const courseId = request.params.courseId;

    const course = request.body;

    const { ...updatedCourse } = course;
    const update = await Course.findByIdAndUpdate( courseId, updatedCourse, { new: true } );

    return update;
};

// delete...
exports.deleteCourse = async( request, reply )=>{
    try {
        const courseId = request.params.courseId;
        const course = Course.findByIdAndDelete( courseId );

        return course;
    } catch (error) {
        throw error;
    }
};