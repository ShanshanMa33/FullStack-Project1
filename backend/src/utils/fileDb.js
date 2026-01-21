const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "..", "data", "users.json");

function readUsers() {
    const raw = fs.readFileSync(dbFilePath, "utf-8");
    return JSON.parse(raw || "[]");
}

function writeUsers(users) {
    fs.writeFileSync(dbFilePath, JSON.stringify(users, null, 2), "utf-8");
}

module.exports = {
    readUsers,
    writeUsers
};