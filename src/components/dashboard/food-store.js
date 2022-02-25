import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

export const FoodStore = (props) => {
  const theme = useTheme();

  return (
    <Card {...props}>
      <CardHeader title="Bodega de Alimentos" />
      <Divider />
      <CardContent>
        <Box>
          <List>
            {props.fetcherror?.message ? (
              <Typography m={5}>
                ¡Lo sentimos! No pudimos cargar la Bodega de Alimentos :(
              </Typography>
            ) : (
              props.stock?.map((ingredient) => (
                <ListItem key={ingredient[0]}>
                  <ListItemText
                    primary={`${ingredient[0][0].toUpperCase() + ingredient[0].slice(1)}: ${
                      ingredient[1]
                    }`}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};
