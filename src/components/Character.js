import React from "react";

const quotes_API = "https://www.breakingbadapi.com/api/quotes";

export default function Character({
	name,
	img,
	birthday,
	occupation,
	status,
	nickname,
	portrayed,
	appearance,
}) {
	const [quotes, setQuotes] = React.useState([]);

	React.useEffect(() => {
		fetch(quotes_API)
			.then((res) => res.json())
			.then((quotes_data) => {
				setQuotes(quotes_data);
			});
	}, []);

	return (
		<div className="character">
			<img src={img} alt={name} />

			<div className="character-info">
				<h1 className="name">{name}</h1>
				<hr className="rule" />

				<div className="small">
					<h5 className="stat"> Status: {status} </h5>

					<h5 className="stat"> Actor: {portrayed}</h5>
					<h5 className="stat"> Occupation: {occupation}</h5>
				</div>
			</div>
			<div className="character-over">
				<h4>Date of Birth:</h4>
				<p>{birthday}</p>
				<h4>Nickname:</h4>
				<p>{nickname}</p>

				<h4>Seasons appeared:</h4>
				<p>{appearance}</p>

				<h4> Quotes:</h4>

				{quotes &&
					quotes.map((quote) => {
						return (
							quote.author === name && <p key={quote.quote_id}>{quote.quote}</p>
						);
					})}
				<p></p>
			</div>
		</div>
	);
}
