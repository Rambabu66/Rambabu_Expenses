import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/utils";
import { useGlobalContext } from "../Context/globalContext";

const ExpensessForm = () => {
  const { addExpenses } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });
  const { title, amount, date, category, description } = inputState;

  // const navigate = useNavigate();
  const handleChangeIncome = (e) => {
    const { name, value } = e.target;
    const copyIncome = { ...inputState };
    copyIncome[name] = value;
    setInputState(copyIncome);
  };

  const handleSubmitIncome = async (e) => {
    e.preventDefault();
    const { title, amount, date, category, description } = inputState;
    if (!title || !amount || !date || !category || !description) {
      return handleError("All fileds Are Required");
    }
    addExpenses(inputState);
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };
  return (
    <>
      <div className="mt-3 pb-5 border bg-white text-center pt-3 rounded-2">
        <form onSubmit={handleSubmitIncome}>
          <div className="p-2 ">
            <input
              type="text"
              className="w-75"
              placeholder="Item Title"
              name="title"
              value={title}
              onChange={handleChangeIncome}
            />
          </div>
          <div className="p-2">
            <input
              type="number"
              className="w-75"
              placeholder="Enter Amount"
              name="amount"
              value={amount}
              onChange={handleChangeIncome}
            />
          </div>
          <div className="p-2">
            <input
              type="date"
              className="w-75"
              placeholder="Enter Date"
              name="date"
              value={date}
              onChange={handleChangeIncome}
            />
          </div>
          <div
            className="p-2 d-flex justify-content-end"
            style={{ marginRight: "75px" }}
          >
            <select
              className="w-50 "
              name="category"
              value={category}
              onChange={handleChangeIncome}
            >
              <option value="">selected</option>
              <option value="education">Education</option>
              <option value="groceries">Groceries</option>
              <option value="health">Health</option>
              <option value="subscriptions">Subscriptions</option>
              <option value="takeaways">Takeaways</option>
              <option value="clothing">Clothing</option>
              <option value="travelling">Travelling</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <textarea
              className="w-75 "
              cols="30"
              rows="4"
              placeholder="add description"
              name="description"
              value={description}
              onChange={handleChangeIncome}
            ></textarea>
          </div>
          <button className="deletebutton">AddExpensess</button>
        </form>
      </div>
    </>
  );
};

export default ExpensessForm;
