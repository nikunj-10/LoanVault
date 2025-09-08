import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Visualization = () => {
  console.log("✅ Visualization component loaded");
  const [dataByCity, setDataByCity] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/customers/stats').then(res => {
      const { cityStats } = res.data;
      setDataByCity({
        labels: Object.keys(cityStats),
        datasets: [{
          label: 'Customers per City',
          data: Object.values(cityStats),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
      });
    }).catch(err => {
      console.error("API Error:", err.message);
    });
  }, []);

  if (!dataByCity) return <p>Loading city data...</p>;

  return (
    <div>
      <h2>📊 City-wise Customer Distribution</h2>
      <Bar data={dataByCity} />
    </div>
  );
};

export default Visualization;
