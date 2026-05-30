import axios from 'axios';
import { Pet } from '../App';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'}/api`,
});

export const fetchPets = () => api.get<Pet[]>('/pets').then(response => response.data);
export const fetchPet = (id: number) => api.get<Pet>(`/pets/${id}`).then(response => response.data);
export const createPet = (pet: Omit<Pet, 'id'>) => api.post<Pet>('/pets', pet).then(response => response.data);
export const updatePet = (id: number, pet: Omit<Pet, 'id'>) => api.put<Pet>(`/pets/${id}`, pet).then(response => response.data);
export const deletePet = (id: number) => api.delete<void>(`/pets/${id}`);