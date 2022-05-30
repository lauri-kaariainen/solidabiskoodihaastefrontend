import "./style";
import { Fragment, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Restaurant } from "./restaurant";
import { ConfirmDialog } from "./confirmdialog";
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
  const [activeVote, setActiveVote] = useState("");
  const [proposedVote, setProposedVote] = useState("");
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

  const voteRestaurant = (name) => {
    setProposedVote(name);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="sm">
      <h1>Lounaspaikkaäänestys</h1>
      <Stack direction="row" spacing={2}>
        <Autocomplete
          disablePortal
          blurOnSelect
          id="combo-box-demo"
          options={citiesObj.cities}
          sx={{ width: 250 }}
          onChange={(_, newVal) => setSelectedCity(newVal)}
          renderInput={(params) => <TextField {...params} label="Kaupunki" />}
        />
        {voteResults.length ? (
          <Stack spacing={1}>
            {voteResults.slice(0, 2).map((res) => (
              <div>
                {res.name}, {res.votes} ään{res.votes > 1 ? "tä" : "i"}
              </div>
            ))}
          </Stack>
        ) : (
          ""
        )}
      </Stack>
      {activeVote ? (
        <Stack direction="row" spacing={2}>
          <div>
            Olet äänestänyt tänään: <Button>{activeVote}</Button>
          </div>
          <IconButton
            aria-label="delete"
            color="primary"
            onclick={setActiveVote.bind(null, "")}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ) : (
        ""
      )}
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
