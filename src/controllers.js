const ticketsCollection = require("./tickets");

//tickets selling controllers

exports.sellSingleTicket = (req, res) => {
  const { username, price } = req.body;
  const ticket = ticketsCollection.create(username, price);

  res.status(201).json({ message: "Ticket Created Successfully", ticket });
};

exports.sellBulkTicket = (req, res) => {
  const { username, price, quantity } = req.body;
  const ticket = ticketsCollection.createBulk(username, price, quantity);

  res.status(201).json({ message: "Ticket Created Successfully", ticket });
};

//find tickets controllers

exports.findAll = (_req, res) => {
  const tickets = ticketsCollection.find();
  res.status(200).json({ item: tickets, total: tickets.length });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  const ticket = ticketsCollection.findById(id);

  if (!ticket) {
    res.status(404).json({ message: "404 not found" });
  }

  res.status(200).json(ticket);
};

exports.findByUsername = (req, res) => {
  const username = req.params.username;
  const tickets = ticketsCollection.findByUsername(username);

  res.status(200).json({ item: tickets, total: tickets.length });
};

//Update controllers

exports.updateById = (req, res) => {
  const id = req.params.id;
  const ticket = ticketsCollection.updateByID(id, req.body);

  if (!ticket) {
    res.status(404).json({ message: "404 not found" });
  }

  res.status(200).json(ticket);
};

exports.updateByUsername = (req, res) => {
  const username = req.params.username;
  const tickets = ticketsCollection.updateBulk(username, req.body);

  res.status(200).json({ item: tickets, total: tickets.length });
};

//Delete controllers

exports.deleteById = (req, res) => {
  const id = req.params.id;
  const isDeleted = ticketsCollection.deleteById(id);

  if (isDeleted) {
    res.status(204).send();
  }

  res.status(400).json({ message: "Delete Operation Failed" });
};

exports.deleteByUsername = (req, res) => {
  const username = req.params.username;
  ticketsCollection.deleteBulk(username);

  res.status(204).send();
};

//Draw controller

exports.drawWinners = (req, res) => {
  const wc = req.query.wc ?? 3;
  const winners = ticketsCollection.draw(wc);

  res.status(200).json(winners);
};
