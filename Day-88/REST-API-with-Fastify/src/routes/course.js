const courseController = require("../controllers/course");

const routes = [
    {
        method: "GET",
        url: "/api/course",
        handler: courseController.getCourse
    },
    {
        method: "GET",
        url: "/api/course/:courseId",
        handler: courseController.getACourse
    },
    {
        method: "POST",
        url: "/api/course",
        handler: courseController.addCourse
    },
    {
        method: "PUT",
        url: "/api/course/:courseId",
        handler: courseController.updateCourse
    },
    {
        method: "DELETE",
        url: "/api/course/:courseId",
        handler: courseController.deleteCourse
    }
];

module.exports = routes;

// http://localhost:3000/api/course