// import { Line, Pie } from 'chart.js';
import {Line,Pie} from 'chart.js/auto';

const lineChart = new Line(document.getElementById('line-chart'), {
  data: {
    labels: selected.map(row => row.first_name),
    datasets: [{
      label: 'Value',
      data: selected.map(row => row.value),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: truE
        }
      }]
    }
  }
});

const pieChart = new Pie(document.getElementById('pie-chart'), {
  data: {
    labels: selected.map(row => row.first_name),
    datasets: [{
      label: 'Value',
      data: selected.map(row => row.value),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    }]
  }
});

const average = selected.reduce((sum, row) => sum + row.value, 0) / selected.length;
