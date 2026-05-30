import { useEffect, useMemo, useState } from 'react';
import { Container, Typography, TextField, MenuItem, Grid, Card, CardMedia, CardContent, Chip, CardActions, Button, Stack, CircularProgress } from '@mui/material';
import { fetchPets, deletePet } from './api/petApi';

// Re-add your clean local model interface
export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  price: number;
  age: number;
  description: string;
  imageUrl: string;
  available: boolean;
}

const speciesOptions = ['All', 'Dog', 'Cat', 'Rabbit', 'Fish'];

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPets()
      .then((data) => {
        setPets(data as Pet[]);
      })
      .catch((error) => console.error("Error loading pets:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSpecies = species === 'All' || pet.species === species;
      const matchesSearch = 
        (pet.name?.toLowerCase() || '').includes(search.toLowerCase()) || 
        (pet.breed?.toLowerCase() || '').includes(search.toLowerCase());
      return matchesSpecies && matchesSearch;
    });
  }, [pets, search, species]);

  const handleDelete = async (id: number) => {
    try {
      await deletePet(id);
      setPets((current) => current.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error("Error removing pet:", error);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold" color="primary">
        Petstore
      </Typography>
      
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
        <TextField
          fullWidth
          label="Search pets by name or breed"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {speciesOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {loading ? (
        <Stack alignItems="center" my={4}>
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container spacing={3}>
          {filteredPets.map((pet) => (
            <Grid item key={pet.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'}
                  alt={pet.name}
                />
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
                    ${typeof pet.price === 'number' ? pet.price.toFixed(2) : '0.00'} · {pet.age} year{pet.age === 1 ? '' : 's'} old
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