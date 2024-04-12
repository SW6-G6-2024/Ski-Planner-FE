import buttonLift from "../icons/lifts/buttonLift.svg";
import chairLift from "../icons/lifts/chair-lift-legend.svg";
import gondolaLift from "../icons/lifts/gondola.svg";
import redPiste from "../icons/pistes/red.svg";
import blackPiste from "../icons/pistes/black.svg";
import bluePiste from "../icons/pistes/blue.svg";
import greenPiste from "../icons/pistes/green.svg";
import nonPreparedPiste from "../icons/pistes/non-prep.svg";
import tbarLift from "../icons/lifts/t-bar.svg";
import liftRoute from "../icons/lifts/lift.svg";

/**
 * Legend data for the map
 */
const legendData = [
  {
    name: "Button lift",
    icon: buttonLift,
  },
  {
    name: "Very easy piste",
    icon: greenPiste,
  },
  {
    name: "Chair lift",
    icon: chairLift, 
  },
  {
    name: "Easy piste",
    icon: bluePiste,
  },
  {
    name: "Gondola lift",
    icon: gondolaLift,
  },
  {
    name: "Medium piste",
    icon: redPiste,
  },
  {
    name: "T-bar lift",
    icon: tbarLift,
  },
  {
    name: "Expert piste",
    icon: blackPiste,
  },
  {
    name: "Lift",
    icon: liftRoute,
  },
  {
    name: "Non-prepared piste",
    icon: nonPreparedPiste,
  }
];

export default legendData;