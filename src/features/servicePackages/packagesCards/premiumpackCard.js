import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./premiumCard.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Modal } from "antd";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import cardImage from "../../../assets/images/premiumCardImage.png";

export default function PremiumPackCard(props) {
  const [open, setOpen] = React.useState(false);
  const styleAnchor = {
    color: "black",
    textDecoration: "underline",
    fontWeight: "bolder",
  };
  const handleClick3Dot = () => {
    setOpen(!open);
  };
  const [modal1Visible, setModal1Visible] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Deactivate Package"
        style={{
          top: 20,
        }}
        visible={modal1Visible}
        footer={null}
        closeIcon={
          <>
            <svg
              width="26"
              height="26"
              style={{ marginTop: "13px" }}
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.67969 8.67969L17.3197 17.3197M17.3197 8.67969L8.67969 17.3197L17.3197 8.67969Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </>
        }
        onOk={() => setModal1Visible(false)}
        onCancel={() => setModal1Visible(false)}
      >
        <p style={{ textAlign: "center" }}>
          You are about to Deactivate the package . Are you sure?
        </p>
        <div
          style={{
            height: "67px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              padding: "8px 10px",
              marginLeft: "18px",
              border: "1px solid #676879",
              fontSize: "15px",
              background: "rgba(17, 17, 17, 0.04)",
              color: "black",
            }}
            onClick={handleClickOpen}
          >
            No, Go Back
          </Button>

          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              padding: "8px 10px",
              marginLeft: "18px",
              fontSize: "15px",
              float: "right",
            }}
            onClick={handleClickOpen}
          >
            Yes, I am sure. Deactivate
          </Button>
        </div>
      </Modal>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          action={
            <IconButton onClick={handleClick3Dot} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.pkgName}
          sx={{ color: "#003399" }}
        />
        <div style={{ position: "relative" }}>
          <ul
            className={`${open ? " " : "display"} `}
            style={{
              position: "absolute",
              right: "0",
              background: "white",
              listStyle: "none",
              width: "142px",
              height: "192px",
              background: "#F4F6F9",
            }}
          >
            <li className="li">
              {" "}
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7189 3.65054L11.9801 0.892969C11.7992 0.712588 11.5543 0.611328 11.299 0.611328C11.0437 0.611328 10.7988 0.712588 10.6178 0.892969L0.90865 10.6052L0.0221836 14.4378C-0.00839653 14.5779 -0.00734822 14.7231 0.0252518 14.8627C0.0578519 15.0024 0.12118 15.1329 0.210611 15.2449C0.300041 15.3569 0.413314 15.4475 0.542155 15.51C0.670996 15.5725 0.81215 15.6054 0.955306 15.6063C1.02201 15.613 1.08922 15.613 1.15593 15.6063L5.02372 14.7182L14.7189 5.01531C14.8989 4.83401 15 4.58867 15 4.33293C15 4.07718 14.8989 3.83184 14.7189 3.65054ZM4.55716 13.8769L0.931978 14.6388L1.75779 11.0773L9.02215 3.82815L11.8215 6.63246L4.55716 13.8769ZM12.4467 5.95475L9.64734 3.15044L11.271 1.53329L14.0237 4.3376L12.4467 5.95475Z"
                  fill="#676879"
                />
              </svg>
              <span>Edit</span>
            </li>
            <li className="li">
              {" "}
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.875 5.36133V8.36133C4.875 8.46078 4.91451 8.55617 4.98484 8.62649C5.05516 8.69682 5.15054 8.73633 5.25 8.73633C5.34946 8.73633 5.44484 8.69682 5.51516 8.62649C5.58549 8.55617 5.625 8.46078 5.625 8.36133V5.36133C5.625 5.26187 5.58549 5.16649 5.51516 5.09616C5.44484 5.02584 5.34946 4.98633 5.25 4.98633C5.15054 4.98633 5.05516 5.02584 4.98484 5.09616C4.91451 5.16649 4.875 5.26187 4.875 5.36133ZM6.75 4.98633C6.84946 4.98633 6.94484 5.02584 7.01517 5.09616C7.08549 5.16649 7.125 5.26187 7.125 5.36133V8.36133C7.125 8.46078 7.08549 8.55617 7.01517 8.62649C6.94484 8.69682 6.84946 8.73633 6.75 8.73633C6.65054 8.73633 6.55516 8.69682 6.48483 8.62649C6.41451 8.55617 6.375 8.46078 6.375 8.36133V5.36133C6.375 5.26187 6.41451 5.16649 6.48483 5.09616C6.55516 5.02584 6.65054 4.98633 6.75 4.98633ZM7.5 3.11133H9.75C9.84946 3.11133 9.94484 3.15084 10.0152 3.22116C10.0855 3.29149 10.125 3.38687 10.125 3.48633C10.125 3.58578 10.0855 3.68117 10.0152 3.75149C9.94484 3.82182 9.84946 3.86133 9.75 3.86133H9.33525L8.77125 8.94333C8.7203 9.40198 8.502 9.82574 8.15813 10.1335C7.81426 10.4412 7.36898 10.6114 6.9075 10.6113H5.0925C4.63102 10.6114 4.18574 10.4412 3.84187 10.1335C3.498 9.82574 3.2797 9.40198 3.22875 8.94333L2.664 3.86133H2.25C2.15054 3.86133 2.05516 3.82182 1.98484 3.75149C1.91451 3.68117 1.875 3.58578 1.875 3.48633C1.875 3.38687 1.91451 3.29149 1.98484 3.22116C2.05516 3.15084 2.15054 3.11133 2.25 3.11133H4.5C4.5 2.7135 4.65804 2.33197 4.93934 2.05067C5.22064 1.76936 5.60218 1.61133 6 1.61133C6.39782 1.61133 6.77936 1.76936 7.06066 2.05067C7.34196 2.33197 7.5 2.7135 7.5 3.11133V3.11133ZM6 2.36133C5.80109 2.36133 5.61032 2.44035 5.46967 2.581C5.32902 2.72165 5.25 2.91242 5.25 3.11133H6.75C6.75 2.91242 6.67098 2.72165 6.53033 2.581C6.38968 2.44035 6.19891 2.36133 6 2.36133V2.36133ZM3.41925 3.86133L3.97425 8.86083C4.00489 9.13597 4.1359 9.39015 4.34221 9.57474C4.54853 9.75933 4.81566 9.86137 5.0925 9.86133H6.9075C7.18421 9.86118 7.45116 9.75906 7.65732 9.57449C7.86348 9.38992 7.99438 9.13584 8.025 8.86083L8.5815 3.86133H3.42H3.41925Z"
                  fill="#676879"
                />
              </svg>
              <span>Delete</span>
            </li>
            <li className="li">
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.2565 3.11133C7.35596 3.11133 7.45134 3.15084 7.52167 3.22116C7.59199 3.29149 7.6315 3.38687 7.6315 3.48633V4.48633H8.625C8.72446 4.48633 8.81984 4.52584 8.89017 4.59616C8.96049 4.66649 9 4.76187 9 4.86133C9 4.96078 8.96049 5.05617 8.89017 5.12649C8.81984 5.19682 8.72446 5.23633 8.625 5.23633H7.6315V6.23633C7.6315 6.33578 7.59199 6.43117 7.52167 6.50149C7.45134 6.57182 7.35596 6.61133 7.2565 6.61133C7.15704 6.61133 7.06166 6.57182 6.99133 6.50149C6.92101 6.43117 6.8815 6.33578 6.8815 6.23633V5.23633H5.875C5.77554 5.23633 5.68016 5.19682 5.60984 5.12649C5.53951 5.05617 5.5 4.96078 5.5 4.86133C5.5 4.76187 5.53951 4.66649 5.60984 4.59616C5.68016 4.52584 5.77554 4.48633 5.875 4.48633H6.8815V3.48633C6.8815 3.38687 6.92101 3.29149 6.99133 3.22116C7.06166 3.15084 7.15704 3.11133 7.2565 3.11133V3.11133Z"
                  fill="#676879"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.51172 1.98633C3.51172 1.50333 3.90372 1.11133 4.38672 1.11133H10.1247C10.6077 1.11133 10.9997 1.50333 10.9997 1.98633V7.73533C10.9997 7.96739 10.9075 8.18995 10.7434 8.35405C10.5793 8.51814 10.3568 8.61033 10.1247 8.61033H4.38672C4.15465 8.61033 3.93209 8.51814 3.768 8.35405C3.60391 8.18995 3.51172 7.96739 3.51172 7.73533V1.98633V1.98633ZM4.38672 1.86133C4.35357 1.86133 4.32177 1.8745 4.29833 1.89794C4.27489 1.92138 4.26172 1.95318 4.26172 1.98633V7.73533C4.26172 7.80483 4.31772 7.86033 4.38672 7.86033H10.1247C10.1579 7.86033 10.1897 7.84716 10.2131 7.82372C10.2365 7.80027 10.2497 7.76848 10.2497 7.73533V1.98633C10.2497 1.95318 10.2365 1.92138 10.2131 1.89794C10.1897 1.8745 10.1579 1.86133 10.1247 1.86133H4.38672V1.86133Z"
                  fill="#676879"
                />
                <path
                  d="M0.99707 5.48487C0.997005 5.36993 1.01959 5.25609 1.06353 5.14987C1.10748 5.04366 1.17192 4.94714 1.25318 4.86583C1.33443 4.78453 1.43091 4.72003 1.53711 4.67603C1.6433 4.63202 1.75712 4.60937 1.87207 4.60938H2.62457C2.72403 4.60938 2.81941 4.64888 2.88974 4.71921C2.96006 4.78954 2.99957 4.88492 2.99957 4.98438C2.99957 5.08383 2.96006 5.17921 2.88974 5.24954C2.81941 5.31987 2.72403 5.35938 2.62457 5.35938H1.87207C1.83892 5.35938 1.80712 5.37254 1.78368 5.39599C1.76024 5.41943 1.74707 5.45122 1.74707 5.48438L1.74957 10.2354C1.74957 10.3044 1.80507 10.3604 1.87457 10.3604H6.62457C6.65772 10.3604 6.68952 10.3472 6.71296 10.3238C6.7364 10.3003 6.74957 10.2685 6.74957 10.2354V9.48037C6.74957 9.38092 6.78908 9.28554 6.85941 9.21521C6.92973 9.14488 7.02511 9.10537 7.12457 9.10537C7.22403 9.10537 7.31941 9.14488 7.38974 9.21521C7.46006 9.28554 7.49957 9.38092 7.49957 9.48037V10.2354C7.49957 10.4674 7.40738 10.69 7.24329 10.8541C7.07919 11.0182 6.85663 11.1104 6.62457 11.1104H1.87457C1.64251 11.1104 1.41995 11.0182 1.25585 10.8541C1.09176 10.69 0.99957 10.4674 0.99957 10.2354L0.99707 5.48487Z"
                  fill="#676879"
                />
              </svg>
              <span>Duplicate</span>
            </li>
            <li className="li" onClick={() => setModal1Visible(true)}>
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.00085 2.68276V1.82561H4.00126V2.68276H5.00085ZM6.00043 3.5399V2.68276H5.00085V3.5399H6.00043ZM5.00085 4.39704V3.5399H4.00126V4.39704H5.00085ZM6.00043 5.25419V4.39704H5.00085V5.25419H6.00043ZM11.4669 2.65597C11.6127 2.78097 11.7376 2.95061 11.8417 3.1649C11.9459 3.37919 11.9979 3.57561 11.9979 3.75419V11.4685C11.9979 11.647 11.925 11.7988 11.7793 11.9238C11.6335 12.0488 11.4565 12.1113 11.2482 12.1113H0.752617C0.544371 12.1113 0.367361 12.0488 0.221589 11.9238C0.075816 11.7988 0.00292969 11.647 0.00292969 11.4685V0.754185C0.00292969 0.575614 0.075816 0.423828 0.221589 0.298828C0.367361 0.173828 0.544371 0.111328 0.752617 0.111328H7.7497C7.95795 0.111328 8.18702 0.155971 8.43692 0.245257C8.68681 0.334542 8.88465 0.441685 9.03042 0.566685L11.4669 2.65597ZM7.9996 1.02204V3.5399H10.9359C10.8838 3.41044 10.8265 3.31892 10.7641 3.26535L8.31978 1.16936C8.2573 1.11579 8.15058 1.06669 7.9996 1.02204ZM10.9983 11.2542V4.39704H7.7497C7.54146 4.39704 7.36445 4.33454 7.21867 4.20954C7.0729 4.08454 7.00001 3.93276 7.00001 3.75419V0.968471H6.00043V1.82561H5.00085V0.968471H1.00251V11.2542H10.9983ZM6.10195 6.42606L6.93754 8.76311C6.97919 8.88365 7.00001 8.99972 7.00001 9.11133C7.00001 9.48186 6.81129 9.78878 6.43384 10.0321C6.0564 10.2754 5.57873 10.397 5.00085 10.397C4.42296 10.397 3.9453 10.2754 3.56785 10.0321C3.1904 9.78878 3.00168 9.48186 3.00168 9.11133C3.00168 8.99972 3.0225 8.88365 3.06415 8.76311C3.17348 8.48186 3.48585 7.59794 4.00126 6.11133V5.25419H5.00085V6.11133H5.61778C5.73231 6.11133 5.83383 6.14035 5.92234 6.19838C6.01084 6.25642 6.07071 6.33231 6.10195 6.42606ZM5.00085 9.5399C5.27677 9.5399 5.51235 9.49749 5.70758 9.41267C5.90282 9.32785 6.00043 9.2274 6.00043 9.11133C6.00043 8.99526 5.90282 8.89481 5.70758 8.80999C5.51235 8.72517 5.27677 8.68276 5.00085 8.68276C4.72492 8.68276 4.48934 8.72517 4.29411 8.80999C4.09888 8.89481 4.00126 8.99526 4.00126 9.11133C4.00126 9.2274 4.09888 9.32785 4.29411 9.41267C4.48934 9.49749 4.72492 9.5399 5.00085 9.5399Z"
                  fill="#676879"
                />
              </svg>
              <span>DeActivate</span>
            </li>
          </ul>
          <CardMedia
            component="img"
            height="194"
            width="100"
            image={cardImage}
          />
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.pkgDes}
          </Typography>
          <Grid spacing={2} sx={{ mt: 2 }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "start",
                justifyContent: "start",
              }}
            >
              <Grid item xs={2}>
                <AccessTimeIcon />
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="span"
                  display="block"
                  sx={{ color: "#003399", fontSize: 16, fontWeight: 900 }}
                >
                  Package Duration
                </Typography>
                <Typography variant="p" display="block" maxWidth="328px">
                  This pacakge is legnth is{" "}
                  <a href="#" style={styleAnchor}>
                    {" "}
                    UP TO {props.pkgDuration} hours
                  </a>
                </Typography>
              </Grid>
            </Stack>

            <Stack
              spacing={2}
              direction="row"
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "start",
                justifyContent: "start",
              }}
            >
              <Grid item xs={2}>
                <DateRangeIcon />
              </Grid>
              <Grid item xs={4}>
                {/* {" "} */}
                <Typography
                  variant="span"
                  display="block"
                  sx={{ color: "#003399", fontSize: 16, fontWeight: 900 }}
                >
                  Date & Time Availability
                </Typography>
                <Typography variant="p" display="block" maxWidth="328px">
                  This pacakge is{" "}
                  <a href="#" style={styleAnchor}>
                    {" "}
                    ONLY{" "}
                  </a>
                  available from{" "}
                  <a href="#" style={styleAnchor}>
                    {" "}
                    Friday, from 11:00 AM to 11:00 PM
                  </a>
                </Typography>
              </Grid>
            </Stack>

            <Stack
              spacing={2}
              direction="row"
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "start",
                justifyContent: "start",
              }}
            >
              <Grid item xs={2}>
                <DateRangeIcon />
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="span"
                  display="block"
                  sx={{ color: "#003399", fontSize: 16, fontWeight: 900 }}
                >
                  Package length
                </Typography>
                <Typography variant="p" display="block" maxWidth="328px">
                  This pacakge is{" "}
                  <a href="#" style={styleAnchor}>
                    ONLY
                  </a>{" "}
                  available from{" "}
                  <a href="#" style={styleAnchor}>
                    June 1, 2022 to Sep 30, 2022
                  </a>
                </Typography>
              </Grid>
            </Stack>
          </Grid>
        </CardContent>
        <CardActions style={{ backgroundColor: "#F5F7FB" }}>
          <Stack
            spacing={25}
            direction="row"
            style={{
              width: "-webkit-fill-available",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ color: "#003399", fontSize: "30px", fontWeight: "bolder" }}
            >
              <AttachMoneyIcon /> {props.pkgPrice}
            </Button>
            {props.pkgActive && (
              <Button
                style={{
                  marginLeft: "0px",
                  height: "fit-content",
                  padding: "6px 20px",
                  marginRight: "22px",
                }}
                variant="contained"
              >
                Activate
              </Button>
            )}
            {!props.pkgActive && (
              <Button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px 20px",
                  width: "107px",
                  height: "40px",
                  background: "rgba(17, 17, 17, 0.12)",
                  border: "1px solid #676879",
                  borderRadius: "4px",
                  color: "black",
                  textTransform: "capitalize",
                }}
                variant="contained"
              >
                Deactivate
              </Button>
            )}
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}
