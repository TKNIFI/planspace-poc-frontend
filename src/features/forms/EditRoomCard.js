import React from "react";
import "./AddRoomCard.css";

const EditRoomCard = ({ value, onClick }) => {
  return (
    <div className="card-room" onClick={onClick}>
      {" "}
      {console.log("value in card ", value)}
      <img
        // src="https://images4.alphacoders.com/378/37864.jpg"
        // src={value.get("file")}
        // alt={value.get("name")}
        className="card-room-img"
        srcSet=""
      />{" "}
      <h1 className="room-name">{value.name}</h1>
      <p className="room-info">Room 300A, Max. Guest {value.max_guests}</p>
      <div className="card-tags">{/* <CardTags /> */}</div>
    </div>
  );
};

function CardTags() {
  return (
    <div className="card-tag">
      {" "}
      <span>Space</span> <span className="card-tag-count">3</span>
    </div>
  );
}

export default EditRoomCard;
