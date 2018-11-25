import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import Navbar from "./navbar";

import "typeface-roboto";
import "./App.css";
import CardList from "./components/cardList";

export default class App extends Component {
	constructor() {
		super();
		const results = [{
			"_id" : "5bede1f13b488b201bcbce58", 
			"ga" : { 
				"term" : "rialtas", 
				"mutations" : { 
					"nominativeSingular" : 	"rialtas", 
					"genitiveSingular" : 	"rialtais", 
					"nominativePlural" : 	"rialtais", 
					"genitivePlural" : 		"rialtas" 
				}, 
				"gender" : "masculine", 
				"declension" : 1 }, 
			"en" : { "term" : "government" }}];
		this.state = {results: results};
	}

	componentDidMount() {
		this.getDefinitions()
	}

	getDefinitions() {
		fetch("/tearma/api/v2/find?query=government&queryLanguage=en&limit=10&offset=0")
			.then((res) => res.json())
			.then((terms) => this.setState({ results: terms }));
	}

	render() {
		const { results } = this.state;
		return(
			<div className="App">
				<Navbar />
				<CardList results={results} />
			</div>
		);
	}
}