import { Album, Games, Person, RateReview } from "@mui/icons-material";
import "./adminDashboardBlock.scss";
import { CircularProgress } from "@mui/material";

export const AdminDashboardBlock = ({
  colSpan,
  title,
  color,
  number,
  isLoading,
}) => {
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
      {!isLoading ? (
        <span style={{ color: color }}>{number}</span>
      ) : (
        <CircularProgress
          color={
            title === "Games"
              ? "success"
              : title === "Copies"
              ? "error"
              : title === "Users"
              ? "warning"
              : title === "Reviews"
              ? "secondary"
              : "info"
          }
        />
      )}
    </div>
  );
};
