import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import MenuItem from "./item";

export default function Category() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/menu/getCategoriesItems")
      .then((res) => res.json())

      .then((data) => setItems(data));
  }, []);
  {console.log(items)}
  return (
    <div style={{ marginTop: "2%" }}>

      {items.categories && items.categories.map((item, index) => {
        return (
          <div key={index} id={`${item._id}`}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontFamily: "Poppins",
                fontSize: "32",
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              {item.title}
            </Typography>
            <List
              sx={{
                width: "70%",
                bgcolor: "background.paper",
                alignItems: "center",
                margin: "auto",
              }}
            >
              {item.items.map((item, index) => {
                return <MenuItem key={index} item={item} />;
              })}
            </List>
          </div>
        );
      })}
    </div>
  );
}
