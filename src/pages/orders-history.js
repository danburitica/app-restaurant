import Head from "next/head";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { SeverityPill } from "src/components/severity-pill";

const OrdersHistory = () => {
  const API_URL = "http://localhost:3002/api/info?key=history";

  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    try {
      const { data: orders } = await axios.get(API_URL);
      setOrders(orders);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Historial Pedidos | Restaurant</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ m: 1 }} variant="h4">
            Historial de Pedidos
          </Typography>
          <Box sx={{ mt: 3 }}>
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
        </Container>
      </Box>
    </>
  );
};
OrdersHistory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default OrdersHistory;