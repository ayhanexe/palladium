import InvoiceInfo from "@root/components/invoice-info/invoice-info";

const HomePage = () => {
  return (
    <section
      className="bg-red-100 h-screen bg-cover bg-center bg-no-repeat py-2"
      style={{ backgroundImage: "url(/images/main-bg.jpg)", boxShadow: "inset 0 20px 20px 0px rgba(0, 0, 0, 0.5)" }}
    >
      <InvoiceInfo />
    </section>
  );
};

export default HomePage;
