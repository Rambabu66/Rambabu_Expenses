import React from "react";
import { dateFormat } from "../utils/dateFormate";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
  uber
} from "../utils/Icons";
import { Link } from "react-router-dom";
const IncomeItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  tabIndicatorColor,
  type,
  
}) => {
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
        case "uber":
          return uber;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };
  // console.log('type', type)

  return (
    <div
      className="d-flex p-2 border  text-center  rounded-2  "
      style={{ margin: "6px",backgroundColor:'#FCF6F9' }}
      indicator={indicatorColor}
    >
      <div className="d-flex">
        <div className="pt-1 fs-2">
          {type === "OutgoingExpensess" ? expenseCatIcon() : categoryIcon()}
          
        </div>

        <div className="d-flex  px-4 pb-4    ">
          <h5 className="position-relative  ">{tabIndicatorColor}{title}</h5>
          <div className="d-flex justify-content-between position-absolute pt-3 mt-2 ">
            <div className="d-flex justify-content-between ">
              <p className="mx-2">
                {dollar} <span className="mx-2">{amount}</span>{" "}
              </p>
              <p className="mx-4">
                {calender} {dateFormat(date)}
              </p>

              <div
                className="dropdown position-relative"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {comment}{" "}
                <span
                  className="d-inline-block text-truncate position-absolute mx-1 "
                  style={{ maxWidth: 50, cursor: "pointer" }}
                >
                  {description}
                </span>
                <ul className="dropdown-menu ">
                  <li>
                    <Link className="dropdown-item text-wrap text-white " style={{width:250,backgroundColor:"blue"}}>{description}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => deleteItem(id)}
        className="ms-auto mx-3 mt-3 bg-danger rounded-5 h-50  "
      >
        <strong>{trash}</strong>
      </button>
    </div>
  );
};

export default IncomeItem;
