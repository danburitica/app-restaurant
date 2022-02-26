import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { OrdersHistory } from "../components/dashboard/orders-history";
import { BuyHistory } from "../components/dashboard/buy-history";
import { Orders } from "../components/dashboard/orders";
import { FoodStore } from "../components/dashboard/food-store";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  // Stock
  const NEXT_PUBLIC_VERCEL_STOCK =
    process.env.NEXT_PUBLIC_VERCEL_STOCK || "http://localhost:3001/api/info?key=stock";
  const [stock, setStock] = useState([]);
  const [fetchErrorStock, setFetchErrorStock] = useState({});

  // Orders
  const NEXT_PUBLIC_VERCEL_ORDER =
    process.env.NEXT_PUBLIC_VERCEL_ORDER || "http://localhost:3002/api/kitchen";
  const [orders, setOrders] = useState([]);
  const [fetchErrorOrder, setFetchErrorOrder] = useState({});
  const [disabled, setDisabled] = useState(false);

  const handleOnClick = async () => {
    setDisabled(true);
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
      const { data: order } = await axios.get(NEXT_PUBLIC_VERCEL_ORDER);
      setOrders((orders) => [...orders.slice(0, -1), order]);
      setDisabled(false);
    } catch (error) {
      setFetchErrorOrder(error);
    }
  };

  // Orders History
  const NEXT_PUBLIC_VERCEL_ORDER_HISTORY =
    process.env.NEXT_PUBLIC_VERCEL_ORDER_HISTORY || "http://localhost:3002/api/info?key=history";
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [fetchErrorOrdHistory, setFetchErrorOrdHistory] = useState({});

  // Buy History
  const NEXT_PUBLIC_VERCEL_BUY_HISTORY =
    process.env.NEXT_PUBLIC_VERCEL_BUY_HISTORY || "http://localhost:3001/api/info?key=history";
  const [buyHistory, setBuyHistory] = useState([]);
  const [fetchErrorBuyHistory, setFetchErrorBuyHistory] = useState({});

  useEffect(async () => {
    if (!orders.length || orders[orders.length - 1]?.status === "delivered") {
      resetErrors();
      try {
        const { data: stock } = await axios.get(NEXT_PUBLIC_VERCEL_STOCK);
        setStock(Object.entries(stock));
      } catch (error) {
        setFetchErrorStock(error);
      }
      try {
        const { data: orders } = await axios.get(NEXT_PUBLIC_VERCEL_ORDER_HISTORY);
        setOrdersHistory(orders.slice(-5));
      } catch (error) {
        setFetchErrorOrdHistory(error);
      }
      try {
        const { data: history } = await axios.get(NEXT_PUBLIC_VERCEL_BUY_HISTORY);
        setBuyHistory(history.slice(-5));
      } catch (error) {
        setFetchErrorBuyHistory(error);
      }
    }
  }, [orders]);

  const resetErrors = () => {
    setFetchErrorStock({});
    setFetchErrorOrder({});
    setFetchErrorOrdHistory({});
    setFetchErrorBuyHistory({});
  };

  return (
    <>
      <Head>
        <title>App | Restaurant</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Orders
                orders={orders}
                fetcherror={fetchErrorOrder}
                handleonclick={{ handleOnClick }}
                disabled={disabled}
              />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <FoodStore sx={{ height: "100%" }} stock={stock} fetcherror={fetchErrorStock} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <BuyHistory
                sx={{ height: "100%" }}
                buyhistory={buyHistory}
                fetcherror={fetchErrorBuyHistory}
              />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <OrdersHistory ordershistory={ordersHistory} fetcherror={fetchErrorOrdHistory} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
