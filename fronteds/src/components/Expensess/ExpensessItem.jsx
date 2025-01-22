import React from "react";
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
} from "../utils/Icons";

const ExpensessItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
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
  return (
    <div className="d-flex px-3 border bg-white text-center pt-3 rounded-2">
      <div className="mr-5 ">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
        icomn
      </div>
      <div className="d-flex  px-4 pb-4   ">
        <h5 className="position-relative  ">{title}</h5>
        <div className="d-flex justify-content-between position-absolute pt-4 ">
          <div className="d-flex justify-content-between">
            <p className="mx-1 ">{amount}</p>
            <p className="mx-5">{date}</p>
            <p className="mx-4">
              {comment}
              {description}
            </p>
          </div>
        </div>
        <div style={{ marginLeft: "400px" }} onClick={() => deleteItem(id)}>
          delte
        </div>
      </div>
    </div>
  );
};

export default ExpensessItem;
