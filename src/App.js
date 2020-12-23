// import "./App.css";
import Character from "./components/Character";
import { useEffect, useState } from "react";

const characters_API = "https://www.breakingbadapi.com/api/characters";

const quotes_API = "https://www.breakingbadapi.com/api/quotes";

const search_API = "https://www.breakingbadapi.com/api/characters?name=";

function App() {
	const [characters, setCharacters] = useState([]);

	const [quotes, setQuotes] = useState([]);

	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		fetch(characters_API)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setCharacters(data);
			});

		fetch(quotes_API)
			.then((res) => res.json())
			.then((quotes_data) => {
				// console.log(quotes_data);
				setQuotes(quotes_data);
			});
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();

		fetch(search_API + searchTerm)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				setCharacters(data);
			});
	};

	const handleOnChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div>
			<header>
				<form onSubmit={submitHandler}>
					<input
						className="search"
						type="search"
						placeholder="Search..."
						value={searchTerm}
						onChange={handleOnChange}
					/>
				</form>
			</header>

			<div className="character-container">
				{characters.length > 0 &&
					characters.map((character) => (
						<Character key={character.id} {...character} />
					))}

				<Character {...quotes} />
				{/* {quotes.length > 0 && quotes.map((quote) => <Character {...quote} />)} */}
			</div>
		</div>
	);
}

export default App;
