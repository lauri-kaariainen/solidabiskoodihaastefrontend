import "./style";
import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Restaurant } from "./restaurant";
import { ConfirmDialog } from "./confirmdialog";
import Container from "@mui/material/Container";

const city = "tampere";
const SEARCH =
  "//lauri.space/solidabiskoodihaaste22/api/v1/restaurants/" + city;

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [activeVote, setActiveVote] = useState("");
  const [proposedVote, setProposedVote] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetch(`${SEARCH}`)
      .then((r) => r.json())
      .then((json) => setRestaurants((json && json.restaurants) || []));
  }, [city]);

  const voteRestaurant = (name) => {
    // console.log(name);
    setProposedVote(name);
    setOpenDialog(true);
  };
  const handleDialogClose = (value) => {
    setOpenDialog(false);
  };

  console.log("active:", activeVote);

  return (
    <Container maxWidth="sm">
      <h1>{city.toUpperCase()}</h1>
      <div class="list">
        {restaurants.map((restaurant) => (
          <Restaurant
            restaurant={restaurant}
            selected={restaurant.name === activeVote}
            clickVote={voteRestaurant.bind(null, restaurant.name)}
          />
        ))}
      </div>
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
