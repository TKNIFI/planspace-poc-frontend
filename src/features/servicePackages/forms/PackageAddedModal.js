import { Button, Modal } from "antd";
import React, { useState } from "react";
import "./PackageModal.css";
const PackageAddedModal = (props) => {
  return (
    <>
      <Modal
        title={props.title}
        style={{
          top: 20,
        }}
        // closeIcon={
        //   <>
        //     <svg
        //       width="26"
        //       height="26"
        //       style={{ marginTop: "13px" }}
        //       viewBox="0 0 26 26"
        //       fill="none"
        //       xmlns="http://www.w3.org/2000/svg"
        //     >
        //       <path
        //         d="M8.67969 8.67969L17.3197 17.3197M17.3197 8.67969L8.67969 17.3197L17.3197 8.67969Z"
        //         stroke="white"
        //         stroke-linecap="round"
        //         stroke-linejoin="round"
        //       />
        //       <path
        //         d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
        //         stroke="white"
        //         stroke-linecap="round"
        //         stroke-linejoin="round"
        //       />
        //     </svg>
        //   </>
        // }
        visible={props.modal1Visible}
        footer={null}
        onOk={() => props.setModal1Visible(false)}
        onCancel={() => props.setModal1Visible(false)}
      >
        <p>{props.data}</p>
      </Modal>
    </>
  );
};

export default PackageAddedModal;
