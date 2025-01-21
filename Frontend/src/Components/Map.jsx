import React from "react";
import "./Map.css";

const Map = () => {
  return (
    <div className="map-container">
      <iframe
        className="map-frame"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14245.736949639944!2d75.8185309!3d26.794298700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1737393937424!5m2!1sen!2sin"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="map-overlay"></div>
    </div>
  );
};

export default Map;


