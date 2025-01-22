import React, { createContext, useContext, useEffect, useState } from "react";
import { Apical, handleError, handleSuccess } from "../utils/utils";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);

  // Calculate Incomes
  const addIncome = async (income) => {
    try {
      const url = `${Apical}/expenses/addIncome`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(income),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);

        // setTimeout(() => {
        //   navigate("/login");
        // }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }

      console.log(result);
    } catch (error) {
      handleError(error);
    }
    getIncomes();
  };

  const getIncomes = async () => {
    try {
      const url = `${Apical}/expenses/getIncome`;
      const headers = {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);

      const result = await response.json();
      // console.log("--result", result.data);
      setIncomes(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const deleteIncome=async(id)=>{
    try {
      const url = `${Apical}/expenses/${id}`;
      const headers = {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);

      const result = await response.json();
      // console.log("--result", result.data);
      setIncomes(result.data);
      const { success, message } = result;
      if(success){
        handleSuccess(message)
      }
      
    } catch (err) {
      handleError(err);
    }
    getIncomes();
  }


  // Calculate Expensess

  const addExpenses = async (expensesss) => {
    try {
      const url = `${Apical}/expenses/addOutgoing`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expensesss),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);

        // setTimeout(() => {
        //   navigate("/login");
        // }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }

      console.log(result);
    } catch (error) {
      handleError(error);
    }
    getExpenses();
  };

  const getExpenses = async () => {
    try {
      const url = `${Apical}/expenses/getOutgoing`;
      const headers = {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);

      const result = await response.json();
      // console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const deleteExpenses=async(id)=>{
    try {
      const url = `${Apical}/expenses/deletedOutgoing/${id}`;
      const headers = {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);

      const result = await response.json();
      // console.log("--result", result.data);
      setExpenses(result.data);
      const { success, message } = result;
      if(success){
        handleSuccess(message)
      }
    } catch (err) {
      handleError(err);
    }
    getExpenses();
  }


  // Total ammount
  useEffect(() => {
    const amounts = incomes.map(item => item.amount);
    const income = amounts.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);
        const amount = expenses.map(item => item.amount);
    const exp = amount.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);
    setIncomeAmt(income);
    setExpenseAmt(exp);

    
}, [incomes,expenses])

const transactionHistory = () => {
  const history = [...incomes, ...expenses]
  history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return history.slice(0, 3)
}





  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        addExpenses,
        getExpenses,
        deleteExpenses,
        expenses,
       incomeAmt,
       expenseAmt,
       transactionHistory
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
