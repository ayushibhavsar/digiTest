import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const FilterComponent = ({ onFilterChange,resetFilterData }) => {
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    console.log(filters,'filters')
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setFilters({
      firstName: '',
      lastName: '',
      email: '',
    });
    resetFilterData()
   
  };

  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField
        label="First Name"
        name="firstName"
        value={filters.firstName}
        onChange={handleInputChange}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={filters.lastName}
        onChange={handleInputChange}
      />
      <TextField
        label="Email"
        name="email"
        value={filters.email}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={applyFilters}>
        Apply Filters
      </Button>
      <Button onClick={resetFilters}>Reset Filters</Button>
    </Box>
  );
};

export default FilterComponent;
