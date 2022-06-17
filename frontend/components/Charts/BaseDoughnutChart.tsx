import React from 'react'
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from 'react-chartjs-2'

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
)

function BaseDoughnutChart({data, custonConfig}: {data: Array<any> , custonConfig?: any}) {
    
  return (
    <Doughnut   options={{
        elements: {
            
            point: {
                pointStyle: "circle",
            }
        },
        plugins: {
            tooltip: {
                usePointStyle: true,
            },
        
            legend: {
                
                position: "bottom",
                align: "center",
                display: true
            }
        }
    }}  data={{
        datasets: data,
        
    }}  />
  )
}

export default BaseDoughnutChart