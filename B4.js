const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
var multer = require('multer');
const bodyParser = require("body-parser");
const cal = require('./calculator')

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});
app.use(bodyParser.urlencoded({ extended: true }));
// cau hinh
app.engine(
    "hbs",
    exphbs.engine({
        extname: "hbs",
        defaultLayout: 'page2',
        layoutsDir: "views/layouts/"
    })
);
//upload file
var storage = multer.diskStorage({
    //function xác định nơi lưu tệp
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    //xác định tên tệp tin được tải lên
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage });
//create post of
app.post('/upload', upload.single("avatar"), function (req, res) {
    //thông tin của file
    console.log(req.file);
    //trả về clinet nếu thành công
    res.send('Thanh Cong');
});


app.set('view engine', '.hbs'); // => xác định phần mở rộng
app.set('views', './views'); // => xác định đường dẫn cho thư mục
// get folder index
app.get('/', (res, req) => {
    res.render('index', {
        layout: 'main',
        helpers: {
            foo() { return 'foo. CP17305 - server Android'; }
        }
    })
})

app.get("/maytinh", (req, res) => {
    res.render('emptyView', {
        layout: 'page2',
        SoA: 15, SoB: 7, phepTinh: 'cong', kq: 22,
    });
});

//

app.get("/tinh123", (req, res) => {
    const soA = isNaN(parseInt(req.query.soA)) ? '' : parseInt(req.query.soA);
    const soB = isNaN(parseInt(req.query.soB)) ? '' : parseInt(req.query.soB);
    const operator = req.query.operator;
    console.log(soA + " " + soB);
    
    let result;
    if (operator === 'cong') {
      result = soA + soB;
    } else if (operator === 'tru') {
      result = soA - soB;
    } else if (operator === 'nhan') {
      result = soA * soB;
    } else if (operator === 'chia') {
      result = soA / soB;
    }
  
    res.render('emptyView', {
      layout: 'maytinh',
      soA: soA,
      soB: soB,
      operator: operator,
      result: result
    });
  });

// app.post("/tinh123", (req, res) => {
//     console.log(req.body);
//     const soA = Number(req.body.soA);
//     const soB = Number(req.body.soB);
//     const operator = req.body.operator;
//     console.log(soA + "" + soB);

//     switch (operator) {
//         case "cong":
//             const tong = cal.add(soA, soB);
//             res.render('emptyView', {
//                 layout: 'maytinh',
//                 KetQua: `${tong}`,
//             });
//             break;
//         case "tru":
//             const hieu = cal.sub(soA, soB);
//             res.send(`Tong cua ${soA} va ${soB} bang ${hieu}`);
//             break;
//         case "nhan":
//             const tich = cal.mul(soA, soB);
//             res.send(`Tong cua ${soA} va ${soB} bang ${tich}`);
//             break;
//         case "chia":
//             const thuong = cal.div(soA, soB);
//             res.send(`Tong cua ${soA} va ${soB} bang ${thuong}`);
//             break;
//     }
//     res.render('emptyView', {
//         layout: 'maytinh',
//     });
// })



