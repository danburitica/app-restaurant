import {
  Box,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";

export const OrdersHistory = (props) => {
  return (
    <Card {...props}>
      <CardHeader title="Historial de Pedidos" />

      {props.fetcherror?.message ? (
        <Typography m={5}>¡Lo sentimos! No pudimos cargar el Historial de Pedidos :(</Typography>
      ) : !props.ordershistory.length ? (
        <Typography m={5}>El Historial de Pedidos está vacío :)</Typography>
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
              {props.ordershistory?.map(({ _id, title, date, status }) => (
                <TableRow hover key={_id}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>
                    <SeverityPill color={status === "delivered" ? "success" : "warning"}>
                      {status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
          href="/orders-history"
        >
          Ver todo
        </Button>
      </Box>
    </Card>
  );
};
