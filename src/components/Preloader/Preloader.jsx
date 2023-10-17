import React from "react";
import "./Preloader.scss";

function Preloader ({title = 'Запрашиваем информацию', type = '' }) {
  return (
    <div className={type !== 'inner' ? "preloader" : "preloader preloader_inner"}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
      { type !== 'inner' && (<p className="preloader__info">
        { title }
      </p>)}
    </div>
  );
};

export default Preloader;
