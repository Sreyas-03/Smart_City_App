const Node = require("./models/node");

const newNodes = [
  { name: "WM-WF-PH01-00", coords: [17.4465995, 78.3507244] },
  { name: "WM-WD-PH03-00", coords: [17.4431047, 78.3484083] },
  { name: "AQ-SN00-00", coords: [17.4456185, 78.3471671] },
  { name: "SR-AQ-KH95-00", coords: [17.4449698, 78.3496843] }
];

module.exports = () => newNodes.forEach((node) => {
  Node.createNode(node)
    .then((res) => console.log("Created node:", res))
    .catch((err) => console.log(err));
});

/*
* To insert value data using the terminal:
* db.nodes.updateOne({name: "SR-AQ-KH95-00"}, {$push: {data: {name: "Flow", values: [{v1, t1}, {v2, t2}, ... ]}}})
* */
