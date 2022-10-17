import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PaidIcon from "@mui/icons-material/Paid";

export default function CardComponent({ posts }) {
  const {
    title,
    description,
    enddate,
    // postedBy,
    startdate,
    campaignGoal,
    posterName,
  } = posts;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            U
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={posterName}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          StartDate: {startdate.split("T")[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          EndDate: {enddate.split("T")[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CampaignGoal: {campaignGoal}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>{" "}
      <Stack direction="row" spacing={2} paddingLeft={14} paddingBottom={2}>
        <Button
          variant="contained"
          endIcon={<PaidIcon />}
          onClick={() => alert(posts._id)}
        >
          Donate
        </Button>
      </Stack>
    </Card>
  );
}
