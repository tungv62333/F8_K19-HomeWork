const students = [{ name: "a" }, { name: "b" }];

const newStudents = [...students];

newStudents[0].name = "z";

console.log(students);
console.log(newStudents);

/*
Mảng có bị thay đổi không?
- Không thay đổi, vẫn là 2 obj đó
Phần tử bên trong có bị không?
- phần tử students[0] bị thay đổi giá trị do chung địa chỉ ô nhớ với newStudents[0] (tương tự như đối với obj)
*/
