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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
      </CardContent>
      <CardActions>
        <Stack spacing={25} direction="row">
          <Button disabled>Amount</Button>
          <Button>Activate</Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
