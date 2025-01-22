import React, { useEffect, useState } from "react";
import Form from "./Form";
import IncomeItem from "./IncomeItem";
import { useGlobalContext } from "../Context/globalContext";
import { Link } from "react-router-dom";

const Incomes = () => {
  const { getIncomes, incomes, deleteIncome, incomeAmt } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsperPage = 5;
  const lastIndex = currentPage * recordsperPage;
  const firstIndex = lastIndex - recordsperPage;
  const recods = incomes.slice(firstIndex, lastIndex);
  const npage = Math.ceil(incomes.length / recordsperPage);
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
    <main className="mt-5 pt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h4>Income</h4>
            <div className="px-5 border bg-white text-center pt-3 rounded-3">
              <h3>
                TotalIncome:{" "}
                <span style={{ color: "green" }}>₹ {incomeAmt}</span>{" "}
              </h3>
            </div>
          </div>
          <div className="col-md-6  ">
            <Form />
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
                  TabIndicatorProps={{ style: { backgroundColor: "#D97D54" } }}
                  indicatorColor="color: var(--color-green)"
                  deleteItem={deleteIncome}
                  style={{ color: "red" }}
                />
              );
            })}
            {npage ? (
              <nav aria-label="Page navigation example ">
                <ul className="pagination justify-content-end p-3">
                  <li className={currentPage <= 1 ? "disabled" : "page-item"}>
                    <Link className="page-link" onClick={perPage}>
                      Previous
                    </Link>
                  </li>
                  {numbers.map((n, i) => (
                    <li className="page-item" key={i}>
                      <Link
                        className={`page-link ${
                          currentPage === n ? "active1" : ""
                        }`}
                        onClick={() => changeCpage(n)}
                      >
                        {n}
                      </Link>
                    </li>
                  ))}

                  <li
                    className={currentPage >= npage ? "disabled" : "page-item"}
                  >
                    <Link className="page-link" onClick={nextPage}>
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : (
              <p className="fs-2 text-center">Add Income History</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Incomes;
