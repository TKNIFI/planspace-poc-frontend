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
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import cardImage from "../../../assets/images/premiumCardImage.png";
export default function PremiumPackCard() {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Premium Package 1"
        sx={{ color: "#003399" }}
      />
      <CardMedia component="img" height="194" width="100" image={cardImage} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Casa Sea-Esta, a studio apartment with a fabulous sea view and
          tasteful interiors. Located on the Dona Paul highway, this studio
          does'nt give you that feeling of living in a city...
        </Typography>
        <Grid spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={2}>
            <AccessTimeIcon />
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="span"
              display="block"
              sx={{ color: "#003399", fontSize: 16, fontWieght: 900 }}
            >
              Package Duration
            </Typography>
            <Typography variant="p" display="block">
              This pacakge is legnth is UP TO 8 hours
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <DateRangeIcon />
          </Grid>
          <Grid item xs={4}>
            {" "}
            <Typography
              variant="span"
              display="block"
              sx={{ color: "#003399", fontSize: 16, fontWieght: 900 }}
            >
              Date & Time Availability
            </Typography>
            <Typography variant="p" display="block">
              This pacakge is ONLY available from Friday, from 11:00 AM to 11:00
              PM
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <DateRangeIcon />
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="span"
              display="block"
              sx={{ color: "#003399", fontSize: 16, fontWieght: 900 }}
            >
              Package length
            </Typography>
            <Typography variant="p" display="block">
              This pacakge is ONLY available from June 1, 2022 to Sep 30, 2022
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Stack spacing={25} direction="row">
          <Button sx={{ color: "#003399", fontWeight: "bolder" }}>
            <AttachMoneyIcon /> 1200
          </Button>
          <Button variant="contained">Activate</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
