import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';


const SearchBar = () => {
	const [searchText, setSearch] = useState<string>('');

	return (
		<TextField
			variant="standard"
			label="Search"
			color="secondary"
			value={searchText}
			size="small"
			type='search'
			onChange={e => setSearch(e.target.value)}
			placeholder="Coming soon!"
			InputProps={{
				startAdornment: (
					<InputAdornment position={'start'}>
						<SearchIcon htmlColor="#FFFFF1"/>
					</InputAdornment>
				)
			}}
			InputLabelProps={{
				sx: {
					color: '#FFFFF1'
				}
			}}

			sx={{
				ml: 1,
				zIndex: 1,
				// bgcolor: 'theme.palette.secondary.light',
				input: {
					color: '#FFFFF1',
					'&::placeholder': { color: '#FFFFF1' },
				},
				notchedOutline: {color :'#FFFFF1'},
				'& .MuiInput-underline:before': {
					borderBottomColor: '#FFFFF1',
				},
				'& .MuiInputBase-root:before': {
					borderBottomColor: '#FFFFF1',
				},
			}}
		/>
	);
};

export default SearchBar;

