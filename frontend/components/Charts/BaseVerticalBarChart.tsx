import React from 'react'
import {Chart as ChartJs, LinearScale, CategoryScale, BarElement, Tooltip, Title, Legend } from "chart.js"
import { Bar } from 'react-chartjs-2'

ChartJs.register(
    LinearScale,
    CategoryScale,
    BarElement, 
    Tooltip,
    Title,
    Legend
)

function BaseVerticalBarChart({data, labels, colors}:{data: number[], labels: string[], colors:string[]}) {
  return (
    <Bar
    
    options={{
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: true
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }} data={{
        labels,
        datasets: [
            {
                data,
                backgroundColor: colors,
                borderColor: colors
            }
        ]
    }} />
  )
}

export default BaseVerticalBarChart