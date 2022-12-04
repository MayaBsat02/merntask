import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DrawerLeft from "./drawer";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Modal } from "@mui/material";
import { useState } from "react";
import { url } from "../../global";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Category",
    headerName: "Title",
    width: 150,
    editable: true,
  },
  {
    field: "Icon",
    headerName: "Icon",
    width: 150,
    editable: true,
  },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CategoriesGrid() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  // const rows=[
  //     { id: 1, Category: 'Burgers', Icon: '🍔' },
  //     { id: 2, Category: 'Pizza', Icon: '🍕' },
  //     { id: 3, Category: 'Drinks', Icon: '🥤' },
  // ]

  let rows = [];
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3000/menu/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  {
    categories.categories &&
      categories.categories.map((item, index) => {
        rows.push({ id: index, Category: item.title, Icon: item.icon });
      });
  }
  return (
    <Box>
      <DrawerLeft />
      <Typography variant="h3" component="h3">
        Categories
      </Typography>
      <Box sx={{ height: 400, width: "70%", margin: "auto" }}>
        <DataGrid
          rows={rows && rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
          onClick={handleOpen}
        >
          Add Category
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem", marginLeft: "1rem" }}
          onClick={handleOpenDeleteModal}
        >
          Delete Category
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              id="filled-basic"
              label="Category Title"
              variant="filled"
              sx={{ marginBottom: "1rem" }}
            />
            <TextField id="filled-basic" label="Icon" variant="filled" />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", display: "block" }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Modal>
        <Modal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {categories.categories &&
                  categories.categories.map((item, index) => (
                    <MenuItem value={item._id}>{item.title}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", display: "block" }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
