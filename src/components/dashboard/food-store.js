import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export const FoodStore = (props) => {
  const theme = useTheme();
  const API_URL = "http://localhost:3001/api/info?key=stock";

  const [stock, setStock] = useState([]);

  useEffect(async () => {
    try {
      const { data: stock } = await axios.get(API_URL);
      setStock(Object.entries(stock));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Card {...props}>
      <CardHeader title="Bodega de Alimentos" />
      <Divider />
      <CardContent>
        <Box>
          <List>
            {stock.map((ingredient) => (
              <ListItem key={ingredient[0]}>
                <ListItemText
                  primary={`${ingredient[0][0].toUpperCase() + ingredient[0].slice(1)}: ${
                    ingredient[1]
                  }`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};
