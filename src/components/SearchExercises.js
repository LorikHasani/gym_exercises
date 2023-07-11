import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";

function SearchExercises() {
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );

      setBodyParts("all", ...bodyPartsData);
    };

    fetchExercisesData();
  }, []);

  async function handleSearch() {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );

      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );

      setSearch("");
      setExercises(searchedExercises);
    }
  }

  return (
    <div>
      <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
        <Typography
          fontWeight={700}
          sx={{
            fontSize: { lg: "44px", xs: "30px" },
          }}
          mb="50px"
          textAlign="center"
        >
          Awesome Exercises You <br />
          Should Know
        </Typography>
        <Box postition="relative" mb="72px">
          <TextField
            sx={{
              input: { fontWeight: "700", border: "none", borderRadius: "4px" },
              width: { lg: "800px", xs: "350px" },
              backgroundColor: "#fff",
              borderRadius: "40px",
            }}
            height="76px"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Exercises"
            type="text"
          />
          <Button
            className="search-btn"
            sx={{
              bgcolor: "#FF2625",
              color: "#fff",
              textTransform: "none",
              width: { lg: "175px", xs: "12px" },
              fontSize: { lg: "20px", xs: "14px" },
              height: "56px",
              // position: "absolute",
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        <Box sx={{ postition: "relative", width: "100%", p: "20px" }}>
          <HorizontalScrollbar data={bodyParts} />
        </Box>
      </Stack>
    </div>
  );
}

export default SearchExercises;
