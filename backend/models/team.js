// import mongoose module
const mongoose = require("mongoose");
// create team schema
const teamSchema = mongoose.Schema({
    teamName: String,
    owner: String,
    foundation: Number,
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});
// create Team Model
const team = mongoose.model("Team", teamSchema);
// make team exportable
module.exports = team;