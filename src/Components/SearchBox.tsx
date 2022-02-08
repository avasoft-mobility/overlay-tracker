import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { FC, useState } from 'react';

type prop = {
  clicked(searchText: string): void;
};

const SearchBox: FC<prop> = ({ clicked }) => {
  const [searchText, setSearchText] = useState('');

  const EnterHandle = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
    }
  };

  return (
    <>
      {/* Search Box */}
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mt: 2 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 2 }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Search based on Guids or lease details"
          inputProps={{ 'aria-label': 'Search based on Guids or lease details' }}
          onKeyPress={(e) => EnterHandle(e)}
        />
        <IconButton
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={() => {
            clicked(searchText);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};
export default SearchBox;
