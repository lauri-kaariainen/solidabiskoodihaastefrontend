import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const ConfirmModal = ({ restaurantName = "tuntematon" }) => {
  return (
    <Modal>
      <p>Haluatko äänestää ravintolaa {restaurantName}?</p>
      <Stack direction="row" spacing={2}>
        <Button color="success">Kyllä</Button> <Button color="error">Ei</Button>
      </Stack>
    </Modal>
  );
};
