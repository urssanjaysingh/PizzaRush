import React from "react";

const LazyImage = ({ src, alt }) => {
    return (
        <img
            className="card-img-top product-image"
            src={src}
            alt={alt}
            style={{ cursor: "pointer" }}
            loading="lazy"
        />
    );
};

export default LazyImage;
