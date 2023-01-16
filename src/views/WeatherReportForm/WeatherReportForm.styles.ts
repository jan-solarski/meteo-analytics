import { Styles } from "../../theme/theme";

export const container: Styles = {
  paddingX: 10,
  paddingY: 5,
  borderRadius: 4,
  minWidth: "30rem",
};

export const form: Styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  rowGap: 1,
  marginTop: 1,
  "& > *": {
    width: "100%",
    margin: "0.3rem 0",
  },
};
