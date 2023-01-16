import React, { useState } from "react";
import axios from "axios";
import { CenteredLayout } from "../../components/centeredLayout/CenteredLayout";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as styles from "./WeatherReportForm.styles";
import { Link } from "react-router-dom";

interface WeatherReport {
  id: string;
  temperature: number;
  unit: TemperatureUnit;
  city: string;
  date: string;
}

interface FormState {
  temperature: number;
  unit: TemperatureUnit;
  city: string;
  date: string;
}

type TemperatureUnit = "C" | "K" | "F";

export const WeatherReportForm: React.FC = () => {
  const [weatherReports, setWeatherReports] = useState<WeatherReport[]>([]);
  const [formState, setFormState] = useState<FormState>({
    temperature: "",
    unit: "",
    city: "",
    date: "",
  });
  const [errors, setErrors] = useState<FormState>({
    temperature: "",
    unit: "",
    city: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
    } else {
      // Temperature validation
      if (!formState.temperature) {
        setErrors({
          ...errors,
          temperature: "Temperature is required",
        });
      } else if (formState.temperature < -273) {
        setErrors({
          ...errors,
          temperature: "Temperature must be greater than -273",
        });
      }
      if (!formState.unit) {
        setErrors({
          ...errors,
          unit: "Unit is required",
        });
      }

      if (!formState.city) {
        setErrors({
          ...errors,
          city: "City is required",
        });
      }

      if (!formState.date) {
        setErrors({
          ...errors,
          date: "Date is required",
        });
      }

      // if there are no errors, send the data to the API
      if (!Object.values(errors).some((error) => error !== "")) {
        // Konwersja temperatury do Kelwinów
        let temperatureInKelvin: number;
        switch (formState.unit) {
          case "C":
            temperatureInKelvin = formState.temperature + 273.15;
            break;
          case "F":
            temperatureInKelvin =
              ((formState.temperature - 32) * 5) / 9 + 273.15;
            break;
          default:
            temperatureInKelvin = formState.temperature;
        }

        // Wysłanie danych do API
        try {
          const response = await axios.post(
            "http://localhost:8000/api/reports",
            {
              temperature: temperatureInKelvin,
              unit: "K",
              city: formState.city,
              date: formState.date,
            }
          );
          const newWeatherReport = response.data;
          setWeatherReports([...weatherReports, new WeatherReport()]);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <CenteredLayout>
      <Paper sx={styles.container}>
        <Typography variant="h4" component="h1">
          Form
        </Typography>
        <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
          <InputLabel>Temperature:</InputLabel>
          <TextField
            type="number"
            name="temperature"
            size="small"
            onChange={handleChange}
            required
            error={!!errors.temperature}
            helperText={errors.temperature}
            value={formState.temperature}
          />
          <InputLabel>Unit:</InputLabel>
          <Select
            name="unit"
            label="Unit"
            size="small"
            onChange={handleChange}
            required
            error={!!errors.unit}
            helperText={errors.unit}
            value={formState.unit}
          >
            <MenuItem value="C">Celsius</MenuItem>
            <MenuItem value="F">Fahrenheit</MenuItem>
            <MenuItem value="K">Kelvin</MenuItem>
          </Select>
          <InputLabel>City:</InputLabel>
          <TextField
            type="text"
            name="city"
            size="small"
            onChange={handleChange}
            required
            error={!!errors.city}
            helperText={errors.city}
            value={formState.city}
          />
          <InputLabel>Date:</InputLabel>
          <TextField
            type="date"
            name="date"
            size="small"
            onChange={handleChange}
            required
            error={!!errors.date}
            helperText={errors.date}
            value={formState.date}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button component={Link} to={"/report-list"}>
            Click here to see reports
          </Button>
          <Button component={Link} to={"/"}>
            Back to homepage
          </Button>
        </Box>
      </Paper>
    </CenteredLayout>
  );
};
