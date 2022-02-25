import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { SeverityPill } from "../severity-pill";

export const Orders = (props) => {
  const theme = useTheme();

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button
            onClick={props.handleonclick.handleOnClick}
            color="success"
            variant="contained"
            size="large"
            disabled={props.disabled}
          >
            Pedir Plato
          </Button>
        }
        title="Órdenes en Preparación"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          {props.fetcherror?.message ? (
            <Typography m={5}>
              ¡Lo sentimos! Ocurrió un error al pedir el plato :( Intenta más tarde
            </Typography>
          ) : !props.orders?.length ? (
            <Typography m={5}>En éste momento, no tienes pedidos en cocina :)</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Plato</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.orders?.map((order) => (
                    <TableRow hover key={order.id}>
                      <TableCell>{order.title}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <SeverityPill color={order.status === "delivered" ? "success" : "warning"}>
                          {order.status}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
