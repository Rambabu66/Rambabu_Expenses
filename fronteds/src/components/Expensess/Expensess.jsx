import React, { useEffect, useState } from "react";
import ExpensessForm from "./ExpensessForm";
import { useGlobalContext } from "../Context/globalContext";
import IncomeItem from "../Income/IncomeItem";
import { Link } from "react-router-dom";

const Expensess = () => {
  const { getExpenses, expenses, deleteExpenses, expenseAmt } =
    useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsperPage = 5;
  const lastIndex = currentPage * recordsperPage;
  const firstIndex = lastIndex - recordsperPage;
  const recods = expenses.slice(firstIndex, lastIndex);
  const npage = Math.ceil(expenses.length / recordsperPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const perPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  function changeCpage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <main className="mt-5 pt-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h4 className="pt-3">Expensess</h4>
            <div className="px-5 border bg-white text-center pt-3 rounded-3">
              <h3>
                TotalExpenses: <span style={{ color: "red" }}>₹ {expenseAmt} </span>{" "}
              </h3>
            </div>
          </div>
          <div className="col-md-6  ">
            <ExpensessForm />
          </div>
          <div className="col-md-6  ">
            <h3>History</h3>
            {recods.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;

              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="green"
                  deleteItem={deleteExpenses}
                />
              );
            })}
            {npage ? (
              <nav aria-label="Page navigation example ">
                <ul className="pagination justify-content-end p-3">
                  <li className={currentPage <= 1 ? "disabled" : "page-item"}>
                    <Link className="page-link " onClick={perPage}>
                      Previous
                    </Link>
                  </li>
                  {numbers.map((n, i) => (
                    <li
                      // className={`page-item ${currentPage === n ? "active1" : "blue"}`}
                      className="page-item"
                      key={i}
                    >
                      <Link className={`page-link ${currentPage === n ? "active1" : ""}`} onClick={() => changeCpage(n)}>
                        {n}
                      </Link>
                    </li>
                  ))}

                  <li className={currentPage >= npage ? "disabled" : "page-item"}>
                    <Link className="page-link" onClick={nextPage}>
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : (
              <p className="fs-2 text-center">Add Expenses History</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Expensess;
