// Components/ContentSection.js
import React from "react";

export default function ContentSection({ title, content, imageSrc, reverse }) {
  return (
    <section>
      <div className="container px-5">
        <div className={`row gx-5 align-items-center ${reverse ? "flex-row-reverse" : ""}`}>
          <div className="col-lg-6">
            <div className="p-5">
              <img className="img-fluid rounded-circle" src={imageSrc} alt={title} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-5">
              <h2 className="display-4">{title}</h2>
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
