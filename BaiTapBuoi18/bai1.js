const student = {
    name: "hoang",
    parent: {
        name: "bo hoang",
    },
};

const mentor = { ...student };

mentor.name = "bang";
mentor.parent.name = "bo bang";

console.log(student);
console.log(mentor);

/*
student.name có bị đổi không? 
- student.name không thay đổi
- vì lúc này object mentor đã được khai báo là một obj mới, và được lưu trữ ở 1 ô nhớ mới, có giá trị mentor.name không gây ảnh hưởng tới obj student

student.parent.name có bị đổi không?
- student.parent.name bị thay đổi
- vì mặc dù mentor được khai báo là obj mới, tuy nhiên obj parent trong mentor vẫn là obj parent trong student và cùng trỏ tới 1 ô nhớ -> khi thay đổi trong mentor thì trong student cũng thay đổi theo
*/
