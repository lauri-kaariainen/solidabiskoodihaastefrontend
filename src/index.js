import "./style";
import { Fragment, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Restaurant } from "./restaurant";
import { ConfirmDialog } from "./confirmdialog";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import citiesObj from "./cities.json";

// const city = "tampere";
const searchUrl = "//lauri.space/solidabiskoodihaaste22/api/v1/restaurants/";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [activeVote, setActiveVote] = useState("");
  const [proposedVote, setProposedVote] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (selectedCity)
      fetch(`${searchUrl + selectedCity}`)
        .then((r) => r.json())
        .then((json) => setRestaurants((json && json.restaurants) || []));
  }, [selectedCity]);

  const voteRestaurant = (name) => {
    setProposedVote(name);
    setOpenDialog(true);
  };
  const handleDialogClose = (value) => {
    setOpenDialog(false);
  };

  console.log("active:", activeVote);

  return (
    <Container maxWidth="sm">
      <h1>Lounaspaikkaäänestys</h1>
      <Autocomplete
        disablePortal
        blurOnSelect
        id="combo-box-demo"
        options={citiesObj.cities}
        sx={{ width: 300 }}
        onChange={(_, newVal) => setSelectedCity(newVal)}
        renderInput={(params) => <TextField {...params} label="Kaupunki" />}
      />
      {selectedCity ? (
        <Fragment>
          <h1>{selectedCity.toUpperCase()}</h1>
          <div class="list">
            {restaurants.map((restaurant) => (
              <Restaurant
                restaurant={restaurant}
                selected={restaurant.name === activeVote}
                clickVote={voteRestaurant.bind(null, restaurant.name)}
              />
            ))}
          </div>
        </Fragment>
      ) : (
        ""
      )}
      <ConfirmDialog
        handleClose={handleDialogClose}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        restaurantName={proposedVote}
        setActiveVote={setActiveVote}
      />
    </Container>
  );
};

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
