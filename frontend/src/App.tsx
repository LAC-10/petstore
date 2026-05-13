import { useEffect, useMemo, useState } from 'react';
import { Container, Typography, TextField, MenuItem, Grid, Card, CardMedia, CardContent, Chip, CardActions, Button, Stack, CircularProgress } from '@mui/material';
import { Pet } from './types';
import { fetchPets, deletePet } from './api/petApi';

const speciesOptions = ['All', 'Dog', 'Cat', 'Rabbit', 'Fish'];

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPets()
      .then(setPets)
      .finally(() => setLoading(false));
  }, []);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSpecies = species === 'All' || pet.species === species;
      const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || pet.breed.toLowerCase().includes(search.toLowerCase());
      return matchesSpecies && matchesSearch;
    });
  }, [pets, search, species]);

  const handleDelete = async (id: number) => {
    await deletePet(id);
    setPets((current) => current.filter((pet) => pet.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Petstore
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Browse adoptable pets and find the perfect companion for your home.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <TextField
          label="Search pets"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Filter by species"
          value={species}
          onChange={(event) => setSpecies(event.target.value)}
          sx={{ width: { xs: '100%', sm: 220 } }}
        >
          {speciesOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {loading ? (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container spacing={3}>
          {filteredPets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia component="img" height="220" image={pet.imageUrl} alt={pet.name} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                    <Chip label={pet.species} color="primary" size="small" />
                    <Chip label={pet.breed} size="small" />
                  </Stack>
                  <Typography gutterBottom variant="h5" component="div">
                    {pet.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.description}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    ${pet.price.toFixed(2)} · {pet.age} year{pet.age === 1 ? '' : 's'} old
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" disabled={!pet.available}>
                    {pet.available ? 'Available' : 'Unavailable'}
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(pet.id)}>
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {filteredPets.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1">No pets found. Try a different search or filter.</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default App;
