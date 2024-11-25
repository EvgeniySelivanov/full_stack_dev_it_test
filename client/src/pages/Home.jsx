import React, { useState } from 'react';
import { Stack, Box, TextField, Button, Typography, List, ListItem } from '@mui/material';
import sendRequests from '../api/restController';

const Home = () => {

  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState([]);
  const [remainingRequests, setRemainingRequests] = useState(0);


  const handleChange = (e) => {
    setQuantity(e.target.value);
    setError('');
    setResults([])
  };

  const handleSubmit = async () => {
    const number = parseInt(quantity, 10);

    if (isNaN(number)) {
      setError('Please enter a valid number');
      return;
    }

    if (number < 1 || number > 100) {
      setError('Number must be between 1 and 100');
      return;
    }
  
    setRemainingRequests(1000);

    try {
      await sendRequests(number, (index) => {
        setResults((prevResults) => [index,...prevResults]);
        setRemainingRequests((prevRemaining) => prevRemaining - 1);
      },
      (errorMessage) => {
        setErrors((prev) => [...prev, errorMessage]);
      }
    );
    } catch (err) {
      console.error(err);
      setError('Error sending request');
    }
  };

  return (
    <Stack>
      <h1 style={{ textAlign: 'center' }}>Еnter the number of requests</h1>
      <Box sx={{ margin: '50px auto' }}>
        <TextField
          sx={{ width: '300px' }}
          id="outlined-basic"
          label="Number from 1 to 100"
          variant="outlined"
          type="number"
          value={quantity}
          onChange={handleChange}
        />
        {error && (
          <Typography
            color="error"
            sx={{ marginTop: '10px', textAlign: 'center' }}
          >
            {error}
          </Typography>
        )}
        <Typography>
          {errors.length>0&&<span style={{color:'red'}}>{errors[0]}</span>}
          </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ maxWidth: '300px', margin: 'auto' }}
        onClick={handleSubmit}
        disabled={remainingRequests > 0}
      >
        {remainingRequests > 0 ? 'Sending...':'Start'}
      </Button>
      <List sx={{ margin: '20px auto' }}>
        {results.map((index) => (
          <ListItem key={index}>
            <Typography>Request {index} completed</Typography>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default Home;
