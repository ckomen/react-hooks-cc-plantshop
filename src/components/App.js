import React, { useState, useEffect } from 'react';
import AddPlantForm from './AddPlantForm';
import PlantList from './PlantList';

const App = () => {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch all plants from the backend when the app loads
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const updatePlant = (updatedPlant) => {
    setPlants(plants.map((plant) => (plant.id === updatedPlant.id ? updatedPlant : plant)));
  };

  const deletePlant = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Plant Store</h1>
      <input
        type="text"
        placeholder="Search plants"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <AddPlantForm addPlant={addPlant} />
      <PlantList
        plants={filteredPlants}
        updatePlant={updatePlant}
        deletePlant={deletePlant}
      />
    </div>
  );
};

export default App;
