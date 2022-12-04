import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const MenuItem = ({item}) => {
    return (
        <div>
        <ListItem >
        <ListItemText 

          primary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline',fontFamily: "Poppins"}}
              component="h1"
              variant="h5"
              color="text.primary"

            >
              {item.title}
            </Typography>
            <Typography
              sx={{ display: 'inline',fontFamily: "Poppins",float:'right'}}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {item.price} L.L
            </Typography>
          </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline',marginTop:'10px',paddingBottom:'10px',fontFamily: "Poppins", }}
                component="h3"
                variant="body2"
                color="text.secondary"
                marginTop={2}
              >
               {item.description}
              </Typography>
              
            </React.Fragment>
          }
        />
        
      </ListItem>
      <Divider variant="inset" component="li"  />
        </div>
    );
    }

export default MenuItem;