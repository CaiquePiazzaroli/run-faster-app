import bcrypt from "bcrypt";

const hash = "$2b$10$0WBfgH0.8uvtwbtn4tXO2.XU5N/aOVFuJiMn/gan4s30WDxwSJyTi";

console.log(bcrypt.compareSync("1234caique", hash)); // true
