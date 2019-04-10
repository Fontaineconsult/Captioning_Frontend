import fetch from 'cross-fetch'

export const get_courses_by_instructor_id = (id) => {

    fetch(`http://127.0.0.1:5000/api/v1/captioning/courses?instructor_id=${id}`).then(response => response.json()).then(data => console.log(data))

};

export const get_courses_by_student_id = (id) => {

    fetch(`http://127.0.0.1:5000/api/v1/captioning/courses?student_id=${id}`).then(response => response.json()).then(data => console.log(data))

};


export const get_media_by_id = (id) => {

    fetch(`http://127.0.0.1:5000/api/v1/captioning/media?id=${id}`).then(response => response.json()).then(data => console.log(data))


};

export const get_media_by_url = (url) => {

    fetch(`http://127.0.0.1:5000/api/v1/captioning/media?url=${url}`).then(response => response.json()).then(data => console.log(data))


};

export const get_videos_by_student_id = (id, semester) => {

    fetch(`http://127.0.0.1:5000/api/v1/captioning/videos?student_id=${id}&semester=${semester}`).then(response => response.json()).then(data => console.log(data))


};

export const get_videos_by_instructor_id = (id, semester) => {

    fetch(`http://127.0.0.1:5000/api/v1/captioning/videos?instructor_id=${id}&semester=${semester}`).then(response => response.json()).then(data => console.log(data))


};

export const get_all_semester_courses = (semester) => {

    fetch(`http://127.0.0.1:5000/api/v1/captioning/courses?semester=${semester}`).then(response => response.json()).then(data => console.log(data))

}