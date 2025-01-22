import React, { useEffect } from "react";
import { useGlobalContext } from "../Context/globalContext";
import History from "./History";
import Chart from "./Chart";

const Dashboard = () => {
  const { incomeAmt, expenseAmt, getIncomes, getExpenses, transactionHistory } =
    useGlobalContext();
  const [...history] = transactionHistory();
  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);
  return (
    <main className="mt-5 pt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h4>Dashboard</h4>
          </div>
          <div className="col-md-8">
            <Chart />
            
            <div className="row mt-5 text-uppercase">
              <div className="col-md-4 mb-5">
                <div className="card bg-success text-white h-100 text-center py-2 fs-3">
                  <p>Total Icome</p>
                  <p>₹ {incomeAmt}</p>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <div className="card bg-danger text-white h-100 w-100 text-center py-2 fs-3">
                  <p>Total Expenses</p>
                  <p>₹ {expenseAmt}</p>
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <div className="card bg-primary text-white h-100 text-center py-2 fs-3">
                  <p>Total Balance</p>
                  <p>₹ {incomeAmt - expenseAmt}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 pt-3 py-3">
            <History />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
