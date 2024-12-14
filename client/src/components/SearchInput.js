import React from 'react';

function SearchInput() {
	return (
		<div style={styles.wrapper}>
			<input
				type='text'
				placeholder='Search or start new chat'
				style={styles.input}
			/>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				width='16'
				height='16'
				fill='#888'
				style={styles.icon}>
				<path d='M10 2a8 8 0 105.29 14.71l4.71 4.71a1 1 0 001.42-1.42l-4.71-4.71A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z' />
			</svg>
		</div>
	);
}

const styles = {
	wrapper: {
		position: 'relative',
		padding: '10px 60px 10px 10px',
	},
	input: {
		width: '100%',
		padding: '10px 10px 10px 35px',
		border: '1px solid #ccc',
		borderRadius: '20px',
		outline: 'none',
		fontSize: '0.8rem',
		color: '#888',
	},
	icon: {
		position: 'absolute',
		top: '50%',
		left: '20px',
		transform: 'translateY(-50%)',
		pointerEvents: 'none',
	},
};

export default SearchInput;
