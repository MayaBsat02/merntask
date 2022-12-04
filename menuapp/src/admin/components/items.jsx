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
import { url } from "../../global";
import { getRowIdFromRowModel } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Item",
    headerName: "Title",
    width: 150,
    editable: true,
  },
  {
    field: "Price",
    headerName: "Price",
    width: 150,
    editable: true,
  },
  {
    field: "Description",
    headerName: "Description",
    width: 150,
    editable: true,
  },
  {
    field: "Category",
    headerName: "Category",
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

export default function ItemsGrid() {
  const [items, setItems] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [menuItems, setMenuItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const title=React.useRef();
  const price=React.useRef();
  const description=React.useRef();
  const category=React.useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  // const [deleteId, setDeleteId] = React.useState();
  React.useEffect(() => {
    setLoading(true);
    fetch(url + "/menu/getCategoriesItems")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let temparr = [];
        data.categories.map((category) => {
          category.items.map((item, index) => {
            temparr.push({
              id: item._id,
              Item: item.title,
              Price: item.price,
              Description: item.description,
              Category: category.title,
            });
          });
        });
        setItems(data);
        setRows(temparr);
      });

    fetch(url + "/menu/items")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMenuItems(data);
      });
    setLoading(false);
  }, []);

  const [item, setItem] = React.useState("");
  const [selectedRowItem, setSelectedRowItem] = React.useState({});
  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const handleDelete = () => {
    console.log(deleteId[0]);
    fetch(url + "/admin/deleteItem/" + deleteId[0], {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      body: JSON.stringify({ id: deleteId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          window.location.reload();
        }
      });
  };

const addItem = () => {

    fetch(url + "/admin/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers",
      },
      body:{
        title: title,
        price: price,
        description: description,
        category: category,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          window.location.reload();
        }
        else{
          alert("Error");
        }
      });
  };

  let deleteId;
  return (
    <Box>
      <DrawerLeft />
      <Typography variant="h3" component="h3">
        Categories
      </Typography>
      <Box sx={{ height: 600, width: "70%", margin: "auto" }}>
        <DataGrid
          rows={rows && rows}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(id) => {
            console.log(id);
            deleteId = id;
            console.log("selected id", deleteId);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
          onClick={handleOpen}
        >
          Add Item
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem", marginLeft: "1rem" }}
          onClick={handleDelete}
        >
          Delete Item
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
            ref={title}
              id="filled-basic"
              label="Item Title"
              variant="filled"
              sx={{ marginBottom: "1rem",width:"100%" }}
            />
            <TextField
            ref={price}
              id="filled-basic"
              label="Price"
              variant="filled"
              sx={{ marginBottom: "1rem",width:"100%" }}
            />
            <TextField
            ref={description}
              id="filled-basic"
              label="Description"
              variant="filled"
              sx={{ marginBottom: "1rem",width:"100%" }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Category
              </InputLabel>
              <Select
              ref={category}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={item}
                label="Items"
                onChange={handleChange}
              >
                {items.categories &&
                  items.categories.map((item, index) => (
                    <MenuItem value={item._id}>{item.title}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", display: "block" }}
              type="submit"
              onClick={addItem}
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   addItem();
              //   console.log("submitted");
              // }}
              
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
