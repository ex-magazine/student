
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { ListParams, City } from 'models';
import React,  { ChangeEvent,useRef }  from 'react';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;  
}


export default function StudentFilters ({filter, cityList, onChange, onSearchChange}: StudentFiltersProps) {

  const searchFef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  }

  const handleCityChange = (e:ChangeEvent<{name?: string, value: unknown}> ) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    }
    onChange(newFilter);
  }

  const handleSortChange = (e:ChangeEvent<{name?: string, value: unknown}> ) => {
    if (!onChange) return;
    const value = e.target.value;
    const [_sort, _order] = (value as string ).split('.');
    const newFilter: ListParams = {
      ...filter,     
      _sort: _sort  || undefined,
      _order: (_order as 'asc' | 'desc' )  || undefined,
    }
    onChange(newFilter);
  }

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city:  undefined,
      name_like: undefined,
    }
    onChange(newFilter);
    if (searchFef.current) {
      searchFef.current.value='';
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth  variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by Name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by Name"            
              defaultValue={filter.name_like} 
              onChange={handleSearchChange}
              startAdornment={<InputAdornment position="start">Start...</InputAdornment>}
              endAdornment={<Search />}
              labelWidth={60}
              inputRef={searchFef} 
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="filterByCity">Filter By City</InputLabel>
              <Select
                labelId="filterByCity" 
                value={filter.city || ''}
                onChange={handleCityChange}
                label="Filter By City"
              >
              <MenuItem value="">
              <em>All</em>
              </MenuItem>
              {cityList.map(city => (
                <MenuItem key={city.code} value={city.code}>{city.name}</MenuItem>  
              ))}           
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="sortBy">Sort</InputLabel>
              <Select
                labelId="sortBy" 
                value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                onChange={handleSortChange}
                label="Sort"
              >
              <MenuItem value="">
              <em>No Sort</em>
              </MenuItem>             
              <MenuItem value="name.asc">Name ASC</MenuItem>  
              <MenuItem value="name.desc">Name DESC</MenuItem>  
              <MenuItem value="mark.asc">Mark ASC</MenuItem>  
              <MenuItem value="mark.desc">Name DESC</MenuItem>                        
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={1}>
            <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>Clear</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
