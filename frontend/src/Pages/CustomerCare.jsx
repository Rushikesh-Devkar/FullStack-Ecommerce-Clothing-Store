import React from "react";
import "./CSS/CustomerCare.css";

const CustomerCare = () => {

  return (
    <div className="customer-care">

      <div className="care-banner">
        <h1>Customer Care</h1>
        <p>
          We are here to help you with your shopping experience.
        </p>
      </div>


      <div className="support-box">

        <div className="support-card">
          <h3>📦 Shipping Information</h3>
          <p>
            We provide fast and secure delivery across India.
            Orders are usually delivered within 3-7 working days.
          </p>
        </div>


        <div className="support-card">
          <h3>↩ Returns & Refunds</h3>
          <p>
            Easy returns within 7 days.
            Refunds will be processed after product verification.
          </p>
        </div>


        <div className="support-card">
          <h3>📏 Size Guide</h3>
          <p>
            Select the perfect size using our size guide.
            Check measurements before placing your order.
          </p>
        </div>


      </div>



      <div className="faq-section">

        <h2>Frequently Asked Questions</h2>


        <div className="faq-card">

          <h3>How can I track my order?</h3>
          <p>
            After shipment, tracking details will be shared on your registered email.
          </p>

        </div>


        <div className="faq-card">

          <h3>Can I cancel my order?</h3>
          <p>
            Orders can be cancelled before they are shipped.
          </p>

        </div>


        <div className="faq-card">

          <h3>How can I contact support?</h3>
          <p>
            Email us at support@shopper.com or contact us through WhatsApp.
          </p>

        </div>


      </div>



      <div className="contact-support">

        <h2>Need More Help?</h2>

        <p>
          Our support team is available Monday - Saturday
        </p>

        <button>
          Contact Support
        </button>

      </div>


    </div>
  );
};


export default CustomerCare;