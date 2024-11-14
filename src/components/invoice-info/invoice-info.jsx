import { useEffect, useState } from "react";
import axios from "axios";

import "./styles.scss";
import toNumber from "lodash/toNumber";
import { isNumber } from "lodash";

const InvoiceInfo = () => {
  const [products, setProducts] = useState([
    {
      id: 0,
      name: "Template Good",
      quantity: 10000,
      price: 100,
    },
  ]);
  const [toName, setToName] = useState("");
  const [discountPercent, setDiscountPercent] = useState(20);
  const [invoiceLang, setInvoiceLang] = useState(0);
  const maxInvoiceProductNumber = 3;

  const handleTitleChange = (e, id) => {
    const { value } = e.target;

    setProducts([
      ...products.filter((product) => product.id !== id),
      {
        ...products.find((product) => product.id === id),
        name: value,
      },
    ]);
  };

  const handleQuantityChange = (e, id) => {
    const { value } = e.target;

    const convertedValue = toNumber(value);

    if (isFinite(convertedValue)) {
      setProducts([
        ...products.filter((product) => product.id !== id),
        {
          ...products.find((product) => product.id === id),
          quantity: convertedValue,
        },
      ]);
    }
  };

  const handleUnitPriceChange = (e, id) => {
    const { value } = e.target;

    const convertedValue = toNumber(value);

    if (isFinite(convertedValue)) {
      setProducts([
        ...products.filter((product) => product.id !== id),
        {
          ...products.find((product) => product.id === id),
          price: convertedValue,
        },
      ]);
    }
  };

  const increaseProductCount = () => {
    if (products.length < maxInvoiceProductNumber) {
      setProducts([
        ...products,
        {
          id: products.at(-1).id + 1,
          name: "Template Good",
          quantity: 10000,
          price: 100,
        },
      ]);
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

  const handleDiscountPercentChange = (e) => {
    const { value } = e.target;

    const convertedValue = toNumber(value);

    if (isFinite(convertedValue)) {
      setDiscountPercent(convertedValue);
    }
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
          vatPercent: toNumber(discountPercent),
          products: [
            ...products.map((product) => ({
              name: product.name,
              quantity: toNumber(product.quantity),
              perPrice: toNumber(product.price),
            })),
          ],
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
            <label htmlFor="discount-percent">VAT:</label>
            <input
              id="discount-percent"
              type="number"
              className="w-full border border-black/25 rounded-md h-[35px] px-2"
              value={`${discountPercent}`}
              onChange={handleDiscountPercentChange}
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
              {products
                .sort((a, b) => a.id - b.id)
                .map((data) => (
                  <tr className="border-b" key={data.id}>
                    <td className="p-2 border-r">
                      <input
                        type="text"
                        className="border w-full p-1 rounded"
                        placeholder="Title"
                        value={data.name}
                        onChange={(e) => handleTitleChange(e, data.id)}
                      />
                    </td>
                    <td className="p-2 border-r">
                      <input
                        type="text"
                        className="border w-full p-1 rounded"
                        placeholder="Quantity"
                        value={`${data.quantity}`}
                        onChange={(e) => handleQuantityChange(e, data.id)}
                      />
                    </td>
                    <td className="p-2 border-r">
                      <input
                        type="text"
                        className="border w-full p-1 rounded"
                        placeholder="Unit price"
                        value={`${data.price}`}
                        onChange={(e) => handleUnitPriceChange(e, data.id)}
                      />
                    </td>
                    <td className="p-2"></td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr className="border-b">
                <th colSpan={3} className="text-right p-2 border-r">
                  VAT {discountPercent}%
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
          {products.length >= 2 ? (
            <button
              type="button"
              className="print-button ml-2 bg-blue-500 text-white px-5 rounded-md cursor-pointer border-2 border-transparent active:border-blue-700"
              onClick={handlePrintClick}
              disabled={toName.length === 0}
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
