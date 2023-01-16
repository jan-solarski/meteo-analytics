import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as styles from "./WeatherReportList.styles";
import { edits } from "./WeatherReportList.styles";
import { Link } from "react-router-dom";
import { CenteredLayout } from "../../components/centeredLayout/CenteredLayout";
interface WeatherReport {
  id: string;
  temperature: number;
  unit: TemperatureUnit;
  city: string;
  date: string;
}

type TemperatureUnit = "C" | "K" | "F";

export const WeatherReportList: React.FC = () => {
  const [weatherReports, setWeatherReports] = useState<WeatherReport[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("date");
  const [filterCriteria, setFilterCriteria] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/reports");
        setWeatherReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const sortData = (data: WeatherReport[]) => {
    return data.sort((a, b) => {
      if (a[sortCriteria] < b[sortCriteria]) return -1;
      if (a[sortCriteria] > b[sortCriteria]) return 1;
      return 0;
    });
  };

  const filterData = (data: WeatherReport[]) => {
    return data.filter((report) =>
      report.city.toLowerCase().includes(filterCriteria.toLowerCase())
    );
  };

  const sortedData = sortData(weatherReports);
  const filteredData = filterData(sortedData);

  return (
    <Box>
      <Box sx={styles.edits}>
        <InputLabel>Sort by:</InputLabel>
        <Select
          size="small"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <MenuItem value="temperature">Temperature</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="city">City</MenuItem>
        </Select>
      </Box>
      <Box sx={styles.edits}>
        <InputLabel>Filter by city:</InputLabel>
        <TextField
          size="small"
          type="text"
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
        />
      </Box>
      <Box sx={styles.container}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Temperature</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((report) => (
                <TableRow
                  key={report.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{report.temperature}</TableCell>
                  <TableCell align="center">{report.city}</TableCell>
                  <TableCell align="center">{report.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={styles.centered}>
        <Button component={Link} to={"/report-form"} variant="contained">
          Click here to go to form
        </Button>
        <Button component={Link} to={"/"}>
          Back to homepage
        </Button>
      </Box>
    </Box>
  );
};
