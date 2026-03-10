# Yêu cầu 3 — Nội dung 7 trang HTML

## HOME PAGE

### 1. Trường hợp KHÔNG có h1.title#main trong base.css

Thẻ `<h1 class="title" id="main">HOME PAGE</h1>` có màu `darkblue`

- Vì ID `#main` có độ ưu tiên cao nhất nên thẻ h1 sẽ không có màu của css tag h1 hoặc class .title trong base.css
- Vì ID #main có độ ưu tiên cao nhất nên cũng không bị ghi đè bởi class .title trong theme.css

### 2. Trường hợp CÓ h1.title#main trong base.css

Thẻ `<h1 class="title" id="main">HOME PAGE</h1>` có màu `magenta`

- Vì h1.title#main có độ ưu tiên cao nhất nên không thể bị ghi đè bởi css tag h1, id #main và class .title trong cả base.css theme.css

## TEACHERS PAGE

Sử dụng Internal CSS override này để ghi đè base.css

```css
h3.section {
    color: darkorange;
}
```

nếu chi sử dụng h3 thì sẽ không thể ghi đè vì thẻ h3 có class .section nên sẽ có độ ưu tiên cao hơn

## ORDERS PAGE

`<h2 class="title" id="special" style="color: orange;">`
thẻ h2 trên chịu ảnh hưởng css từ inline, id, class, tag
inline > id > class > tag
-> inline có độ ưu tiên cao nhất
-> thẻ h2 có mà orange

# Yêu cầu 4 — Bẫy CSS Priority

Trong project có 3 phần tử hội tụ đủ các loại CSS sau đây cùng một lúc:

- Tag selector
- Class selector
- ID selector
- Inline style
- External CSS (base.css hoặc theme.css)
- Internal CSS

Thẻ `h1` trong `dashboard/index.html`
2 thẻ `p` trong `orders/index.html`

# Yêu cầu 5 — Số lượng tối thiểu toàn project

## Inline CSS: tối thiểu 6

1. Thẻ `h1` trong `dashboard/index.html`
2. Thẻ `h1` trong `orders/index.html`
3. Thẻ `h2` trong `orders/index.html`
4. Thẻ `p` trong `orders/index.html`
5. Thẻ `p` trong `orders/index.html`
6. Thẻ `p` trong `reports/index.html`

## Internal CSS: tối thiểu 4

1. 5 trong file `dashboard/index.html`
2. 2 trong file `orders/index.html`
   ...

## Class selector: tối thiểu 8

- .title
- .section
- .highlight
- .big
- .content
- .red-color
- .yellow-color
- .pink-color

## ID selector: tối thiểu 6

- #main
- #special
- #darkorange
- #limongreen
- #deeppink
- #magenta

# Yêu cầu 6 — Câu hỏi phân tích (bắt buộc)

Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS?

- inline style (không tính !important)

Câu 2: Nếu một phần tử HTML có cả h1, .title, và #main cùng set color — selector nào thắng? Tại sao?

- #main

Câu 3: Nếu bạn thêm style="color: pink" trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào?

- phần thử có màu `pink`

Câu 4: Tại sao theme.css có thể override style từ base.css? Điều kiện để override thành công là gì?

- theme.css override được base.css vì trong file html theme.css được link tới sau và load sau
- Điều kiện để override thành công:
    - Selector có độ ưu tiên bằng hoặc cao hơn
    - File CSS được load sau

Câu 5: Trong project của bạn, có hai phần tử đều dùng class .title nhưng hiển thị màu khác nhau. Giải thích tại sao.

- 1 trong 2 phần từ bị ghi đè bởi một CSS Selector khác mạnh hơn, chi tiết hơn

ví dụ:

<h2 class="title"></h2>
<h3 class="title"></h3>
h2.title { color: blue; }
h3.title { color: orange; }

<h2 class="title" id="special"></h2>
<h2 class="title"></h2>
.title { color: purple; }
#special { color: red; }

<h2 class="title" style="color:green"></h2>
<h2 class="title"></h2>
.title { color: purple; }

Câu 6: Phần tử nào trong project của bạn có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích selector nào thắng cuối cùng.

- Phần từ có CSS phức tạp nhất là thẻ h1 trong `dashboard/index.html`

<h1 class="title" id="special" style="color:red">DASHBOARD</h1>

- Giải thích:
  selector tác động lên thẻ này:
    - tag: h1
    - class: .title
    - id: #special
    - inline css: style="color:red"

    Những CSS được áp dụng lên thẻ này:
    - base.css → h1 { color: red }
    - base.css → .title { color: purple }
    - theme.css → #special { color: deeppink }
    - internal CSS → h1 { color: green }
    - inline css → style="color: black"

    CSS inline thắng vì nó được ưu tiên cao nhất
    -> màu cuối cùng là black
