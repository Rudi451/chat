import React, {useState, useEffect} from 'react';

const RandomIcon = () => {
	const [randomIcon, setRandomIcon] = useState(null);

	useEffect(() => {
		// Dynamisches Importieren aller Icons im Ordner 'assets/icons'
		const importAllIcons = (requireContext) => {
			return requireContext.keys().map(requireContext);
		};

		// Alle Icons importieren
		const icons = importAllIcons(
			require.context('./assets/user_icons', false, /\.(png|jpe?g|svg)$/)
		);

		/**
		 * Returns random index of icon except the default icon[3]
		 * @returns random index
		 */
		function generateRandom() {
			const num = Math.floor(Math.random() * icons.length);
			return num === 3 ? generateRandom() : num;
		}
		const randomIndex = generateRandom();

		setRandomIcon(icons[randomIndex]);
	}, []);

	// Während das Icon geladen wird, eine Ladeanzeige zeigen
	if (!randomIcon) {
		return <p>Loading...</p>;
	}

	return (
		<img
			src={randomIcon}
			alt='Random Icon'
			style={{width: '50px', height: '50px'}}
		/>
	);
};

export default RandomIcon;
