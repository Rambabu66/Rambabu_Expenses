import React, { useEffect, useState } from "react";
import { Apical, handleError, handleSuccess } from "../utils/utils";
import axios from "axios";
import "./userStyles.css";
import { useNavigate} from "react-router-dom";
const Users = () => {
  const [userdata, setUserData] = useState([]);

  const navigate = useNavigate();
  const fetchInfo = () => {
    const url = `${Apical}/auth/allusers`;
    return axios.get(url).then((res) => {
      const data = res.data.alldata;
      console.log(data);
      setUserData(data);
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  // console.log(data1);

  const deleteUser = async (id) => {
    try {
      const url = `${Apical}/auth/deleteuser/${id}`;
      const respons = await fetch(url, {
        method: "DELETE",
      });
      const result = await respons.json();
      const { message,  success } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(()=>{
          navigate("/")
        },1000)
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }

    fetchInfo();
  };

  return (
    <main class="mt-5 pt-5">
      <div class="container-fluid">
        {/* <div className="r"> */}
        <table class="table table-dark table-hover">
          <thead className="">
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table  table-success ">
            {userdata.map((item, i) => {
              const { _id, name, email } = item;
              return (
                <tr key={i}>
                  <td >{i + 1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>
                    <button className="mx-1" onClick={() => deleteUser(_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <UserUpdate /> */}
      </div>
      {/* </div> */}
    </main>
  );
};

export default Users;
