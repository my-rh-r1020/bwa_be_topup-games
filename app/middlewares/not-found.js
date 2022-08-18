const notFound = (req, res) => res.status(404).send({ msg: "Router doesnt exist" });

module.exports = notFound;
