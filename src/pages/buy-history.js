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
import { useEffect, useState } from "react";
import axios from "axios";

const BuyHistory = () => {
  const NEXT_PUBLIC_VERCEL_BUY_HISTORY = "http://localhost:3001/api/info?key=history";

  const [history, setHistory] = useState([]);
  const [fetchError, setFetchError] = useState({});

  useEffect(async () => {
    try {
      const { data: history } = await axios.get(NEXT_PUBLIC_VERCEL_BUY_HISTORY);
      setHistory(history);
    } catch (error) {
      setFetchError(error);
    }
  }, []);

  const getIngredients = (buyIngredients) => {
    let stringIngredients = "";

    for (const ingredient in buyIngredients) {
      stringIngredients += `${ingredient[0].toUpperCase() + ingredient.slice(1)}: ${
        buyIngredients[ingredient]
      }, `;
    }
    return stringIngredients.slice(0, -2);
  };

  return (
    <>
      <Head>
        <title>Historial Compras | Restaurant</title>
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
            Historial de Compras
          </Typography>
          <Box sx={{ mt: 3 }}>
            {fetchError.message ? (
              <Typography m={5}>
                ¡Lo sentimos! No pudimos cargar el Historial de Compras :(
              </Typography>
            ) : !history.length ? (
              <Typography m={5}>El Historial de Compras está vacío :)</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Ingredientes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((history) => (
                      <TableRow hover key={history.id}>
                        <TableCell>{history.date}</TableCell>
                        <TableCell>{getIngredients(history.buyIngredients)}</TableCell>
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
BuyHistory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default BuyHistory;
