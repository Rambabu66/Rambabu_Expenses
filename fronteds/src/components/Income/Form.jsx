import React, { useState } from 'react'
import { handleError } from '../utils/utils';
import { useGlobalContext } from '../Context/globalContext';

const Form = () => {
  const {addIncome}=useGlobalContext()
    const [inputState, setInputState] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
      });
      const { title, amount, date, category, description } = inputState;
    
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
    
        addIncome(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
       
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
                  <option value="salary">Salary</option>
                  <option value="freelancing">Freelancing</option>
                  <option value="investments">Investiments</option>
                  <option value="stocks">Stocks</option>
                  <option value="bitcoin">Bitcoin</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="youtube">Youtube</option>
                  <option value="uber">BIKE</option>
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
              <button className='deletebutton'>AddIncome</button>
            </form>
          </div>
        </>
      );
    };
    

export default Form