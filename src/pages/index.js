import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { OrdersHistory } from "../components/dashboard/orders-history";
import { BuyHistory } from "../components/dashboard/buy-history";
import { Orders } from "../components/dashboard/orders";
import { FoodStore } from "../components/dashboard/food-store";
import { DashboardLayout } from "../components/dashboard-layout";

const Dashboard = () => (
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
            <Orders />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <FoodStore sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <BuyHistory sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <OrdersHistory />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
