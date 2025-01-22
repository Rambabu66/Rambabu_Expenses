import React from 'react'
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJs, 
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { useGlobalContext } from '../Context/globalContext';
import { dateFormat } from '../utils/dateFormate';
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

const Chart = () => {
      const {incomes, expenses} =useGlobalContext()
      const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }

  
  return (
     <div >
          <Bar  data={data} />
        </div>
  )
}

export default Chart