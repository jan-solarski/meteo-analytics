import { WeatherReportForm } from "./views/WeatherReportForm/WeatherReportForm";
import { WeatherReportList } from "./views/WeatherReportList/WeatherReportList";

export const App = () => {
  return (
    <div>
      <WeatherReportForm />
      <WeatherReportList />
    </div>
  );
};
