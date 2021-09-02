import React from "react";

export default function Card(props) {
  const { item } = props;
  const tagList = item.tags.slice(0, 3);

  const { innerWidth: width } = window;

  return (
    <div className="item-container">
      <div className="item-image">
        <img src={item.photos[0]?.large} alt="unsplash" />
      </div>

      <div className="item-desc">
        <h2 className="item-desc_name">{item.name}</h2>

        <p className="item-desc_gender">{item.gender}</p>

        {width < 767 &&
          tagList.map((_item, idx) => (
            <span key={idx} className="item-desc_tags">
              {_item}
            </span>
          ))}
      </div>
    </div>
  );
}
