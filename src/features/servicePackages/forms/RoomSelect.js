import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function RoomSelect(props) {

  return (
    <div>
      <Autocomplete
        disablePortal
        id="room"
        name="room"
        options={[]}
        getOptionLabel={(option) => option.name}
        onChange={(event, values) => {
          console.log("values in room select", values);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: "-webkit-fill-available" }}
        renderInput={(params) => (
          <TextField
            style={{
              width: "-webkit-fill-available",
              background: "#F4F6F9",
              marginLeft: "-24px",
            }}
            {...params}
            label="Select Room"
          />
        )}
      />
    </div>
  );
}
