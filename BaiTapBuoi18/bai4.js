const user = {
    name: "hoang",
    address: {
        city: "HN",
        location: {
            lat: 123,
        },
    },
};

const newUser = { ...user };

newUser.address.location.lat = 999;

console.log(user.address.location.lat);

/*
Câu hỏi: Kết quả là bao nhiêu? Vì sao?
- 999
- vì newUser.address.location.lat trở tới cùng ô nhớ với user.address.location.lat -> khi newUser.address.location.lat gán giá trị mới -> giá trị tại ô nhớ thay đổi -> user.address.location.lat trỏ tới ô nhớ đó bị thay đổi theo
*/
