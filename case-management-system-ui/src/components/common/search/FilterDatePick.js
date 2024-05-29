import { useEffect, useState } from "react";
import { DateRangePicker } from "rsuite";

const FilterDatePick = ({ handleToggle }) => {
  const [dateOption, setDateOption] = useState();
  const [date, setDate] = useState([]);

  const { afterToday } = DateRangePicker;

  const handleSelect = (data) => {
    if (data == null) return;
    console.info("handleSelect ##", data, "\n type: ", typeof data);
    setDateOption(data);
    const startDate = formatDate(data[0]);
    const endDate = formatDate(data[1]);
    console.log(startDate);
    setDate([startDate, endDate]);
  };
  
  console.log("date-------", date);

  useEffect(() => {
    console.log(date);
    handleToggle(date, "createdOn");
  }, [date]);

  function formatDate(data) {
    const d = new Date(data);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="date">
      <DateRangePicker
        className="select-date-css"
        placeholder="Select date range"
        value={dateOption}
        showOneCalendar
        shouldDisableDate={afterToday()}
        onChange={handleSelect}
        style={{
          height: "30px",
          width: "230px",
        }}
      />
      
    </div>
  );
};

export default FilterDatePick;
