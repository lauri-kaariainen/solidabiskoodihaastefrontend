import "./style";
import { render } from "preact";
import { useState } from "preact/hooks";
import { Restaurant } from "./restaurant";
import Container from "@mui/material/Container";
import ConfirmModal from "./confirmmodal";

const city = "tampere";
const SEARCH =
  "//lauri.space/solidabiskoodihaaste22/api/v1/restaurants/" + city;

const voteRestaurant = (id, name) => {
  alert(id, name);
};

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [activeVote, setActiveVote] = useState("");
  fetch(`${SEARCH}`)
    .then((r) => r.json())
    .then((json) => setRestaurants((json && json.restaurants) || []));

  return (
    <Container maxWidth="sm">
      <h1>{city.toUpperCase()}</h1>
      <div class="list">
        {restaurants.map((restaurant) => (
          <Restaurant
            restaurant={restaurant}
            clickVote={voteRestaurant.bind(restaurant.id).bind(restaurant.name)}
          />
        ))}
      </div>
      <ConfirmModal open={false} restaurantName={"derp"} />
    </Container>
  );
};

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
