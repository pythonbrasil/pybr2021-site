import { Component, useState, useEffect } from 'react';
import Head from 'next/head'
import CalendarHeader from '../../components/CalendarHeader'
import CalendarEvents from '../../components/CalendarEvents'
import axios from 'axios'


function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}

function groupEvents(events) {
  events.sort((a, b) => a.start.dateTime < b.start.dateTime ? -1 : 1);

  var groupedEvents = {}
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  for (var event of events) {
    let datetime = new Date(event["start"]["dateTime"]);
    let endDatetime = new Date(event["end"]["dateTime"]);

    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1 ;
    let day = datetime.getDate();
    let date = `${year}/${month}/${day}`;

    let startHours = String(datetime.getHours()).padStart(2, "0");
    let startMinutes = String(datetime.getMinutes()).padStart(2, "0");
    let startTime = `${startHours}:${startMinutes}`;

    let endHours = String(endDatetime.getHours()).padStart(2, "0");
    let endMinutes = String(endDatetime.getMinutes()).padStart(2, "0");
    let endTime = `${endHours}:${endMinutes}`;

    if (!(date in groupedEvents)) {
      groupedEvents[date] = {};
    }

    if (!(startTime in groupedEvents[date])) {
      groupedEvents[date][startTime] = [];
    }

    if (!(endTime in groupedEvents[date][startTime])) {
      groupedEvents[date][startTime][endTime] = [];
    }

    groupedEvents[date][startTime][endTime].push(event);
  }

  return groupedEvents;
}

export default function Home() {

  const [calendar, setCalendar] = useState(null);
  const [events, setEvents] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    async function getCalendar() {
      const result = await axios("https://www.googleapis.com/calendar/v3/calendars/7siodq5un9gqbqd4mmgf2poiqs@group.calendar.google.com/events?key=AIzaSyAIn8DyZFtthupLozgwIX3NUURFMWEIPb4&timeMin=2021-10-11T00%3A00%3A00.000Z&timeMax=2021-10-18T00%3A00%3A00.000Z&singleEvents=true&maxResults=9999&timeZone=UTC");
      const data = result.data;
      const eventsGrouped = groupEvents(data.items);

      setCalendar(data);
      setEvents(eventsGrouped);
      setCurrentDate(Object.keys(eventsGrouped)[0]);
    };
    getCalendar();
  }, []);

  if (!calendar || !events || !currentDate) return (
    <div className="text-white">loading...</div>
  );

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div className="bg-gray-50 h-full">
      <Head>
        <title>Python Brasil 2021</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CalendarHeader name={calendar.summary} groups={events} activeDate={currentDate} selectDateCallback={setCurrentDate}/>
      <div className="xl:max-w-screen-xl xl:mx-auto p-2 space-y-4 text-gray-500 text-right">
        Fuso Horário: {timezone}
      </div>

      <CalendarEvents events={events[currentDate]} />
    </div>
  )
};
