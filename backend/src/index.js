const PORT = 4000;
const cors = require("cors");
const express = require("express");
const app = express();
const User = require("../db/User");
const Product = require('../db/Product')
const connectDb = require('../db/db');
const Jwt = require("jsonwebtoken");
const jwtKey = 'e-comm';
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../uploads");
        console.log(file)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    try {
        var user = await User.find({ email: req.body.email }).count();
        if (user == 1) {
            resp.status(201).send({ result: 'user already exist' });
        }
        else {
            var user = new User(req.body);
            let res = await user.save();
            resp.send("Signup");
        }
    } catch (error) {
        resp.status(202).send(error);
    }
})
app.post("/login", async (req, resp) => {
    try {
        const res = await User.findOne({ $and: [{ email: req.body.email }, { password: req.body.password }] }).select({ password: 0 });
        if (res) {
            Jwt.sign({ res }, jwtKey, (err, token) => {
                resp.send({ res, token });
            })
        } else {
            resp.status(203).send({ result: "Wrong Email or Password" });
        }
    } catch (error) {
        resp.status(204).send(error);
    }
})

app.post("/add-product", upload.single('image'), async (req, resp) => {
    try {
        const imageName = req.file.filename;
        console.log(imageName, 56);
        let product = new Product(req.body);
        let res = await product.save();
        resp.send(res);
    } catch (error) {
        resp.status(205).send(error);
    }
})
app.get("/product-list", verifyToken, async (req, resp) => {
    try {
        let product = await Product.find();
        resp.send(product);
    } catch (error) {
        resp.status(206).send(error);
    }
})
app.delete('/product/:id', verifyToken, async (req, resp) => {
    try {
        const res = await Product.deleteOne({ _id: req.params.id })
        resp.send(res);
    } catch (error) {
        resp.status(207).send(error);
    }
})
app.get('/product/:id', verifyToken, async (req, resp) => {
    try {
        const res = await Product.findOne({ _id: req.params.id })
        resp.send(res);
    } catch (error) {
        resp.status(208).send();
    }
})
app.put('/product/:id', verifyToken, async (req, resp) => {
    try {
        const res = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
        resp.send(res);
    } catch (error) {
        resp.status(209).send(error);
    }
})
app.get('/search/:key', verifyToken, async (req, resp) => {
    try {
        const res = await Product.find({ $or: [{ name: { $regex: req.params.key, $options: 'i' } }, { category: { $regex: req.params.key, $options: 'i' } }, { company: { $regex: req.params.key, $options: 'i' } }] });
        resp.send(res);
    } catch (error) {
        resp.status(210).send(error);
    }
});

function verifyToken(req, resp, next) {
    const token = req.headers.authorization;
    if (token) {
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(400).send("Invalid JWT Token");
            } else {
                next();
            }
        })
    }
    else {
        resp.status(401).send("Please Add Token");
    }
}

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`My app is running on port number ${PORT}`);
    })
})