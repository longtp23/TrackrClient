import { Album, Games, Person, RateReview } from "@mui/icons-material";
import "./adminDashboardBlock.scss";

export const AdminDashboardBlock = ({ colSpan, title, color, number }) => {
  return (
    <div
      style={{ columnSpan: colSpan, borderColor: color }}
      className="adminDashboardBlockContainer"
    >
      {title === "Games" ? (
        <Games fontSize="inherit" />
      ) : title === "Copies" ? (
        <Album fontSize="inherit" />
      ) : title === "Users" ? (
        <Person fontSize="inherit" />
      ) : title === "Reviews" ? (
        <RateReview fontSize="inherit" />
      ) : (
        <div />
      )}
      <h2>{title}:</h2>
      <span style={{ color: color }}>{number}</span>
    </div>
  );
};
