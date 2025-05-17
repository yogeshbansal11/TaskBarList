import React from "react";

const Map = () => {
  return (
    <div className="h-[84vh] relative top-2 flex justify-center items-center ">
      <iframe
        className="h-[80vh] w-[97vw] rounded-lg"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26727.90980423181!2d75.62982277404367!3d28.240617406351287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3913219fe9fbb61f%3A0x3dc782039a6d1539!2sChirawa%2C%20Rajasthan!5e1!3m2!1sen!2sin!4v1735323738742!5m2!1sen!2sin"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40 pointer-events-none"></div>
    </div>
  );
};

export default Map;
