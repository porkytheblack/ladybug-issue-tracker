import React from 'react'
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from 'react-chartjs-2'
import { AnyMap } from 'immer/dist/internal'

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
)

function BaseDoughnutChart({data, custonConfig, labels}: {data: Array<any> , custonConfig?: AnyMap, labels: string[]}) {
    
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
        labels: labels
    }}  />
  )
}

export default BaseDoughnutChart