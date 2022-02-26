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
  const NEXT_PUBLIC_VERCEL_ORDER_HISTORY =
    process.env.NEXT_PUBLIC_VERCEL_ORDER_HISTORY || "http://localhost:3002/api/info?key=history";

  const [orders, setOrders] = useState([]);
  const [fetchError, setFetchError] = useState({});

  useEffect(async () => {
    try {
      const { data: orders } = await axios.get(NEXT_PUBLIC_VERCEL_ORDER_HISTORY);
      setOrders(orders);
    } catch (error) {
      setFetchError(error);
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
            {fetchError.message ? (
              <Typography m={5}>
                ¡Lo sentimos! No pudimos cargar el Historial de Pedidos :(
              </Typography>
            ) : !orders.length ? (
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
                    {orders.map((order) => (
                      <TableRow hover key={order.id}>
                        <TableCell>{order.title}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <SeverityPill
                            color={order.status === "delivered" ? "success" : "warning"}
                          >
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
        </Container>
      </Box>
    </>
  );
};
OrdersHistory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default OrdersHistory;
