// import { useState, useEffect } from "react";
import { registerLicense } from "@syncfusion/ej2-base";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
// import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

// Registering Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXxcdXVVRWJdUUByXkE="
);


// Fetching Data from 3rd party
// const App = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     async function getData() {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       const data = await response.json();
//       if (data && data.length) setData(data);
//     }
//     getData();
//   }, []);

//   return (
//     <>
//       <ul>
//         {data.map((item) => (
//           <li key={Math.random()}>{item.title}</li>
//         ))}
//       </ul>
//     </>
//   );
// };


const Scheduler = () => {
  let data = [
    {
      Id: 1,
      Title: "Explosion of Betelgeuse Star",
      StartTime: new Date(2024, 3, 2, 9, 30),
      EndTime: new Date(2024, 3, 2, 11, 0),
    },
    {
      Id: 2,
      Title: "Thule Air Crash Report",
      Location: "New York",
      StartTime: new Date(2024, 3, 2, 12, 0),
      EndTime: new Date(2024, 3, 2, 14, 0),
    },
    {
      Id: 3,
      Title: "Blue Moon Eclipse",
      StartTime: new Date(2024, 3, 2, 9, 30),
      EndTime: new Date(2024, 3, 2, 11, 0),
    },
    {
      Id: 4,
      Title: "Meteor Showers in 2018",
      StartTime: new Date(2024, 3, 2, 13, 0),
      EndTime: new Date(2024, 3, 2, 14, 30),
    },
  ];

  const fieldsData = {
    id: { name: "Id" },
    subject: { name: "Title" },
    location: { name: "Location" },
    description: { name: "Description" },
    startTime: { name: "StartTime" },
    endTime: { name: "EndTime" },
    isOnline: { name: "IsOnline" },
  };
  const eventSettings = { dataSource: data, fields: fieldsData };

  return (
    <ScheduleComponent
      currentView="Week"
      readonly={true}
      eventSettings={eventSettings}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>

  );
};

export default Scheduler;
