import * as React from "react";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import myApi from "../../../network/axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function RoomSelect(props) {
  const theme = useTheme();
  const [rooms, setRooms] = React.useState([]);

  const handleChange = (event) => {
    // const {
    //   target: { value },
    // } = event;
    // setPersonName(
    //   // On autofill we get a stringified value.
    //   value
    // );
    props.onChange(event.target.value);
  };

  const getRooms = async () => {
    try {
      let url = `${process.env.REACT_APP_BASE_URL}api/company/room/`;

      //   setLoading(true);
      await myApi.get(url).then((result) => {
        console.log("rooms=> ", result.data.results);
        setRooms(result.data.results);
      });
    } catch (error) {
      //   setLoading(false);
      // alert(error?.data?.message);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        name="room"
        options={rooms}
        getOptionLabel={(option) => option.name}
        onChange={(event, values) => (props.formik.values.room = values)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </div>
  );
}
