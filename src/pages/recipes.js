import Head from "next/head";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const theme = useTheme();
  const API_URL = "http://localhost:3002/api/info?key=recipes";

  const [recipes, setRecipes] = useState([]);

  useEffect(async () => {
    try {
      const { data: recipes } = await axios.get(API_URL);
      setRecipes(recipes);
    } catch (error) {
      console.error(error);
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
        <title>Platos | Restaurant</title>
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
            Recetas Disponibles
          </Typography>
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {recipes.map((recipe) => (
                <Grid item key={recipe.id} lg={4} md={6} xs={12}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          pb: 3,
                        }}
                      ></Box>
                      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
                        {recipe.title}
                      </Typography>
                      <Typography align="center" color="textPrimary" gutterBottom>
                        {getIngredients(recipe.ingredients)}
                      </Typography>
                    </CardContent>
                    <Box sx={{ flexGrow: 1 }} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          ></Box>
        </Container>
      </Box>
    </>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;