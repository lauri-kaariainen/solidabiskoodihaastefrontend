import "./style";
import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Restaurant } from "./restaurant";
import { ConfirmDialog } from "./confirmdialog";
import { ResultsCard } from "./resultscard";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import citiesObj from "./cities.json";

// const city = "tampere";
const restaurantSearchUrl =
  "//lauri.space/solidabiskoodihaaste22/api/v1/restaurants/";

const voteResultsUrl = "//lauri.space/solidabiskoodihaaste22/api/v1/results/";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  // const [activeVoteId, setActiveVoteId] = useState("");

  const [proposedRestaurant, setProposedRestaurant] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [voteResults, setVoteResults] = useState([]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (selectedCity)
      fetch(`${restaurantSearchUrl + selectedCity}`)
        .then((r) => r.json())
        .then((json) => setRestaurants((json && json.restaurants) || []));

    fetch(`${voteResultsUrl}`)
      .then((r) => r.json())
      .then((json) => setVoteResults((json && json.results) || []));
  }, [selectedCity]);

  const voteRestaurant = (restaurant) => {
    setProposedRestaurant(restaurant);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleVoteSuccess = (restaurant) => {
    fetch("//lauri.space/solidabiskoodihaaste22/api/v1/vote/" + restaurant.id, {
      method: "POST"
      // credentials: "include"
      // mode: "cors"
    }).then((res) => console.log("POST Status", res.status));
  };

  return (
    <Container maxWidth="sm">
      <h1>Lounaspaikkaäänestys</h1>
      <Stack direction="column" spacing={2}>
        <Autocomplete
          disablePortal
          blurOnSelect
          id="combo-box-demo"
          options={citiesObj.cities}
          sx={{ width: 250 }}
          onChange={(_, newVal) => setSelectedCity(newVal)}
          renderInput={(params) => <TextField {...params} label="Kaupunki" />}
        />
        {voteResults.length ? <ResultsCard results={voteResults} /> : ""}
      </Stack>
      {activeRestaurant ? (
        <Stack direction="row" spacing={2}>
          <div>
            Olet äänestänyt tänään: <Button>{activeRestaurant.name}</Button>
          </div>
          <IconButton
            aria-label="delete"
            color="primary"
            onclick={setActiveRestaurant.bind(null, null)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ) : (
        ""
      )}
      {selectedCity ? (
        <div>
          <h1>{selectedCity.toUpperCase()}</h1>
          <div class="list">
            {restaurants.map((restaurant) => (
              <Restaurant
                restaurant={restaurant}
                selected={
                  activeRestaurant
                    ? activeRestaurant.name === restaurant.name
                    : false
                }
                clickVote={voteRestaurant.bind(null, restaurant)}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <ConfirmDialog
        handleClose={handleDialogClose}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        restaurant={proposedRestaurant}
        // restaurantId={}
        setActiveRestaurant={setActiveRestaurant}
        handleVoteSuccess={handleVoteSuccess}
      />
    </Container>
  );
};

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
