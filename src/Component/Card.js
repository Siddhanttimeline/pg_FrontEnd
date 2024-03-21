import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const handleClick = () => {
  // Define your click handling logic here
  console.log("Card clicked!");
};

const CardComponent = (props) => (
  <ButtonBase component="div" onClick={handleClick}>
    <CardContent>
      <Typography variant="body1" component="div">
        {props.mainHead}: {props.mainHeadvalue}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" gutterBottom>
          Total Paid: {props.totalPaidValue}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" gutterBottom>
            Total UnPaid: {props.totalUnPaidValue}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </ButtonBase>
);

export default function OutlinedCard(props) {
  return (
    <Box sx={{ width: "fit-content" }}>
      <Card
        props
        variant="outlined"
        sx={{ width: 200, maxHeight: 200, backgroundColor: "#add8e6" }}
      >
        <CardComponent {...props} />
      </Card>
    </Box>
  );
}
