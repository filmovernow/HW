const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 3000;
app.use(express.json());
const SECRET = "mysecretkey";
app.post("/login", (req, res) => {
    const { username } = req.body;
    let role = "user";

    if (username == "admin"){
        role = "admin";
    }
    
    const token = jwt.sign(
        { role: role },
        SECRET,
        {expiresIn: "1h"}
    );
    res.json({
        token: token
    });
});
//all of task1 คือ Login แล้วได้ JWT Token เช็คใน postman http://localhost:3000/login

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({message: "No token"});
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: "Invalid token"});
        }
        req.user = user;

        next();
    })
}
function checkAdmin(req, res, next) {
    if (req.user.role !== "admin"){
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    next();
}

app.get(
    "/admin-only",
    authenticateToken,
    checkAdmin,
    (req, res) => {
        res.json({
            message: "Welcome Admin"
        })
    }
)
//จบข้อ2 postในpostman เขียนjsonว่า
// {
//  "username": "admin"
// } อันนี้task1
//จะได้tokenมาเอาtokenที่ได้ไปใส่ในหมวดbearer token จบอันนี้getนะจ๊ะ http://localhost:3000/admin-only
app.listen(PORT, () => {
    console.log(`Server running on port na ${PORT}`);
});




