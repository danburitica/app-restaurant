import Head from "next/head";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Recipes = () => {
  const theme = useTheme();
  const API_URL = "http://localhost:3002/api/info?key=recipes";

  const [recipes, setRecipes] = useState([]);
  const [fetchError, setFetchError] = useState({});

  useEffect(async () => {
    try {
      const { data: recipes } = await axios.get(API_URL);
      setRecipes(recipes);
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
            {fetchError.message ? (
              <Typography m={5}>¡Lo sentimos! No pudimos cargar las Recetas :(</Typography>
            ) : (
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
                        <Typography
                          fontWeight="bold"
                          align="center"
                          color="textPrimary"
                          gutterBottom
                          variant="h5"
                        >
                          {recipe.title}
                        </Typography>
                        <Typography
                          fontWeight="bold"
                          color="textPrimary"
                          gutterBottom
                          variant="subtitle"
                        >
                          Ingredientes:
                        </Typography>
                        <Typography mt={3} color="textPrimary" gutterBottom>
                          {getIngredients(recipe.ingredients)}
                        </Typography>
                      </CardContent>
                      <Box sx={{ flexGrow: 1 }} />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
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

Recipes.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Recipes;
