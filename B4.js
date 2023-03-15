const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});
// cau hinh
app.engine(
    "hbs",
    exphbs.engine({
        extname: "hbs",
        defaultLayout: 'main',
        layoutsDir: "views/layouts/"
        
    })
);
app.set('view engine', '.hbs'); // => xác định phần mở rộng
app.set('views','./views'); // => xác định đường dẫn cho thư mục
app.get("/", (req, res) => {
    res.render('index' );
});
