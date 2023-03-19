import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const Form = styled('form')(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 8,
	padding: '0 8px 0 0',
	width: 'inherit',
}));

export type FilterProps = {
	onChange: (filters: {
		name: string;
		id: string;
		suggestions: string;
	}) => void;
};

export const Filter = ({ onChange }: FilterProps) => {
	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [suggestions, setSuggestions] = useState('');

	return (
		<Form onChange={() => onChange({ name, id, suggestions })}>
			<Typography component="h2" variant="h5" mb={2}>
				Filter
			</Typography>
			<Typography component="h3">Primary</Typography>
			<TextField
				label="By name"
				onChange={(event) => setName(event.target.value)}
			/>
			<TextField
				label="By ID"
				onChange={(event) => setId(event.target.value)}
			/>
			<Typography component="h3">Secondary</Typography>
			<TextField
				label="By suggestion count"
				onChange={(event) => setSuggestions(event.target.value)}
			/>
		</Form>
	);
};
