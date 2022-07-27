import React from "react";
import "./AddRoomCard.css";

const AddRoomCard = () => {
  return (
    <div className="card-room">
      {" "}
      <img
        src="https://images4.alphacoders.com/378/37864.jpg"
        alt=""
        className="card-room-img"
        srcset=""
      />{" "}
      <h1 className="room-name">South Hall</h1>
      <p className="room-info">Room 300A, Max. Guest 30</p>
      <div className="card-tags">
        <CardTags />
      </div>
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

export default AddRoomCard;
