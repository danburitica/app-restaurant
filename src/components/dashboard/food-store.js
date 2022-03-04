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
              props.stock?.map(({ name, quantity, _id }) => (
                <ListItem key={_id}>
                  <ListItemText primary={`${name[0].toUpperCase() + name.slice(1)}: ${quantity}`} />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};
