import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEffect, useState } from "react";
import axios from "axios";

export const BuyHistory = (props) => {
  const API_URL = "http://localhost:3001/api/info?key=history";

  const [history, setHistory] = useState([]);

  useEffect(async () => {
    try {
      const { data: history } = await axios.get(API_URL);
      setHistory(history.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  }, []);

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
        {history.map((history) => (
          <ListItem key={history.id}>
            <ListItemText
              primary={getIngredients(history.buyIngredients)}
              secondary={history.date}
            />
          </ListItem>
        ))}
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
