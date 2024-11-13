import { useState } from "react";
import axios from "axios";

import "./styles.scss";
import toNumber from "lodash/toNumber";

const InvoiceInfo = () => {
  const [products, setProducts] = useState([0]);
  const [toName, setToName] = useState("");
  const [date, setDate] = useState("");
  const [invoiceLang, setInvoiceLang] = useState(0);
  const maxInvoiceProductNumber = 3;

  const increaseProductCount = () => {
    if (products.length < maxInvoiceProductNumber) {
      setProducts([...products, products.at(-1) + 1]);
    }
  };

  const handleInvoiceLangChange = (e) => {
    const { value } = e.target;

    setInvoiceLang(value);
  };

  const handleToNameChange = (e) => {
    const { value } = e.target;

    setToName(value);
  };

  const handleDateChange = (e) => {
    const { value } = e.target;

    setDate(value);
  };

  const handlePrintClick = () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/Invoice`;

    axios
      .post(
        apiUrl,
        {
          languageId: toNumber(invoiceLang),
          to: toName,
          productCount: products.length,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const pdfUrl = response.data.invoiceUrl;

        window.open(pdfUrl, "_blank");
      });
  };

  return (
    <div className="w-full h-full flex items-start justify-start overflow-auto">
      <div className="p-5 bg-white rounded-lg min-w-[50%] mx-auto mt-32">
        <h2 className="text-3xl text-center">Invoices</h2>

        <div className="w-full flex gap-10 mt-5">
          <div className="w-full flex flex-col items-start">
            <label htmlFor="to-name">To:</label>
            <input
              id="to-name"
              type="text"
              className="w-full border border-black/25 rounded-md h-[35px] px-2"
              value={toName}
              onChange={handleToNameChange}
            />
          </div>
          <div className="w-full flex flex-col items-start">
            <label htmlFor="date">To:</label>
            <input
              id="date"
              type="date"
              className="w-full border border-black/25 rounded-md h-[35px] px-2"
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="w-full border border-black/25 rounded-lg mt-8 ">
          <table className="custom-table">
            <thead>
              <tr className="border-b">
                <th className="p-5 border-r">Product Name</th>
                <th className="p-5 border-r">Quantity</th>
                <th className="p-5 border-r">Unit Price (AZN)</th>
                <th className="p-5">Total amount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((_, index) => (
                <tr className="border-b" key={index}>
                  <td className="p-2 border-r">
                    <p>
                      <b>Template Good</b>
                    </p>
                    <p>Description</p>
                  </td>
                  <td className="p-2 border-r">10 000pcs</td>
                  <td className="p-2 border-r">100,00</td>
                  <td className="p-2">00 00 000,00</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-b">
                <th colSpan={3} className="text-right p-2 border-r">
                  VAT 20%
                </th>
                <th className="text-start p-3">0 000 000</th>
              </tr>
              <tr>
                <th colSpan={3} className="text-right p-2 border-r">
                  Total:
                </th>
                <th className="text-start p-3">00 000 000 EURO</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="w-full pb-3 pt-7 flex">
          <select
            name=""
            className="border border-black/25 rounded-md p-2 cursor-pointer"
            onChange={handleInvoiceLangChange}
            value={invoiceLang}
          >
            <option value="1">TR</option>
            <option value="2">EN</option>
            <option value="0">AZ</option>
          </select>
          {products.length < maxInvoiceProductNumber ? (
            <button
              className="ml-2 px-5 rounded-md cursor-pointer border transition-colors duration-300 border-blue-500 active:bg-blue-500 text-blue-700 active:text-white"
              onClick={increaseProductCount}
            >
              Add product
            </button>
          ) : null}
          {products.length === maxInvoiceProductNumber ? (
            <button
              type="button"
              className="ml-2 bg-blue-500 text-white px-5 rounded-md cursor-pointer border-2 border-transparent active:border-blue-700"
              onClick={handlePrintClick}
            >
              Print
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfo;
