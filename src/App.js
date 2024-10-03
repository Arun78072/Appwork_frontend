import axios from "axios";
import { useEffect, useState } from "react";
import { ApiEndpoint, FormateData } from "./utils";

function App() {
  const [activeScreen, setActiveScreen] = useState("table");
  const [formData, setFormData] = useState({
    type: "Credit",
    amount: "",
    description: "",
  });
  const [transactionData, setTransactionData] = useState([]);

  const submitForm = async () => {
    try {
      const res = await axios.post(`${ApiEndpoint}/add_transaction`, formData);
      if (res.status === 201) {
        setTransactionData([res.data.data, ...transactionData]);
        setActiveScreen("table");
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      type: "Credit",
      amount: "",
      description: "",
    });
  };

  const getTransactions = async () => {
    try {
      const res = await axios.get(`${ApiEndpoint}/get_transaction`);
      if (res.status === 200) {
        setTransactionData(res.data.reverse());
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="App">
      {activeScreen === "table" ? (
        <div className="transactionTable">
          <table>
            <thead>
              <tr>
                <th colSpan="4">Office Transactions</th>
                <th>
                  <button onClick={() => setActiveScreen("transactionBox")}>
                    + Add Transaction
                  </button>
                </th>
              </tr>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Running Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((i) => (
                <tr key={i._id}>
                  <td>{FormateData(i.createdAt)}</td>
                  <td>{i.description}</td>
                  <td>{i.credit}</td>
                  <td>{i.debit}</td>
                  <td>{i.runningBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="transactionBox">
          <h2>New Transaction</h2>
          <div>
            <label>Transaction Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="action_button">
            <button onClick={submitForm}>Save</button>
            <button onClick={() => setActiveScreen("table")}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
