import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEffect, useState } from "react";
import axios from "axios";

export const BuyHistory = (props) => {
  const getIngredients = (buyIngredients) => {
    let stringIngredients = "";

    for (const ingredient in buyIngredients) {
      stringIngredients += `${ingredient[0].toUpperCase() + ingredient.slice(1)}: ${
        buyIngredients[ingredient]
      }, `;
    }
    return stringIngredients.slice(0, -2);
  };

  return (
    <Card {...props}>
      <CardHeader title="Historial de Compras" />
      <Divider />
      <List>
        {props.fetcherror?.message ? (
          <Typography m={5}>¡Lo sentimos! No pudimos cargar el Historial de Compras :(</Typography>
        ) : !props.buyhistory.length ? (
          <Typography m={5}>El Historial de Compras está vacío :)</Typography>
        ) : (
          props.buyhistory?.map((history) => (
            <ListItem key={history.id}>
              <ListItemText
                primary={getIngredients(history.buyIngredients)}
                secondary={history.date}
              />
            </ListItem>
          ))
        )}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          href="/buy-history"
        >
          Ver todo
        </Button>
      </Box>
    </Card>
  );
};
