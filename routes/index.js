"use strict";

const express = require("express");
let router = express.Router();
const fs = require("fs");
const path = require("path");

// todo put this behind a feature flag
if (process.env.ENVIRONMENT === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
	app.get("*", (_req, res) => res.sendFile(path.join(__dirname + "/ui/build/index.html")));
} else {
	router.get("/", (_req, res) => {
		res.render("index", {
			year: new Date().getFullYear()
		});
	});

	router.get("/apps", (_req, res) => {
		res.render("apps", {
			year: new Date().getFullYear()
		});
	});

	router.get("/developers", (_req, res) => {
		res.render("developers", {
			year: new Date().getFullYear()
		});
	});

	router.get("/thesis", (_req, res) => {
		const filePath = path.join(__dirname, "/../public/media/Thesis.pdf");
		fs.readFile(filePath, function (err, data) {
			if (err) return res.status(500).send();

			res.contentType("application/pdf");
			res.send(data);
		});
	});

	router.get("/snapchat-filter", (_req, res) => {
		const filePath = path.join(__dirname, "/../public/media/Snapchat-Filters-Project.pdf");
		fs.readFile(filePath, (err, data) => {
			if (err) return res.status(500).send();

			res.contentType("application/pdf");
			res.send(data);
		});
	});
}

module.exports = router;
