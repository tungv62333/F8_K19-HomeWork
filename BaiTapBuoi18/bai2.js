const student = {
    name: "hoang",
    parent: {
        name: "bo hoang",
    },
};

const mentor = JSON.parse(JSON.stringify(student));

mentor.parent.name = "bo bang";

console.log(student);
console.log(mentor);

/* 
student.parent.name có bị ảnh hưởng không?
- không ảnh hưởng
Vì sao cách này khác spread (const mentor = { ...student })
- khi sử dụng deep copy thì nghĩa là obj mentor đã được khai báo với các key/value và obj mới hoàn toàn ở các ô nhớ mới, không liên quan và cùng địa chỉ với ô nhớ cũ của obj student
*/
