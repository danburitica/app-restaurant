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
  useTheme,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { SeverityPill } from "../severity-pill";

export const Orders = (props) => {
  const theme = useTheme();
  const API_URL = "http://localhost:3002/api/kitchen";

  const [orders, setOrders] = useState([]);

  // [] -> [{create}] -> [{create},{order}]

  const onClick = async () => {
    setOrders([
      ...orders,
      {
        id: Date.now(),
        title: "Creando Receta...",
        date: new Date().toLocaleString(),
        status: "pending",
      },
    ]);
    try {
      const { data: order } = await axios.get(API_URL);
      setOrders((orders) => [...orders.slice(0, -1), order]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button onClick={onClick} color="success" variant="contained" size="large">
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
        </Box>
      </CardContent>
    </Card>
  );
};
