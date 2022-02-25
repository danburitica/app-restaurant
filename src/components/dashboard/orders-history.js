import PerfectScrollbar from "react-perfect-scrollbar";
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
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import axios from "axios";
import { useEffect, useState } from "react";

export const OrdersHistory = (props) => {
  const API_URL = "http://localhost:3002/api/info?key=history";

  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    try {
      const { data: orders } = await axios.get(API_URL);
      setOrders(orders.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Card {...props}>
      <CardHeader title="Historial de Pedidos" />

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
            {orders.map((order) => (
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
