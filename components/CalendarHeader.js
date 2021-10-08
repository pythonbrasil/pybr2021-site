import { Component } from 'react';
import pybrLogo from '../public/logo.png'


function HeaderOptions({groups, activeDate, selectDateCallback}) {
  return groups.map((date, index) => {
    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const week = weekdays[new Date(date).getDay()];
    const isActive = date == activeDate ? "shadow-md font-bold" : "";
    return (
      <div className="p-2">
        <button key={index} onClick={() => selectDateCallback(date)} className={`bg-gray-50 py-2 px-4 rounded ${isActive} hover:shadow-lg transition duration-200`}>{week}</button>
      </div>
    );
  });
}


class CalendarHeader extends Component {
  render() {
    return (
      <div className="p-2">
        <div className="flex flex-col items-start space-y-2 xl:space-y-0 xl:flex-row xl:items-center w-full p-4 rounded bg-gray-200 text-gray-700">
          <div className="flex space-x-2 items-center">
            <img src={pybrLogo.src} width="40"/>
            <div className="font-bold">{this.props.name}</div>
          </div>
          <div className="flex-grow"></div>
          <div className="flex flex-wrap">
            <HeaderOptions groups={Object.keys(this.props.groups)} activeDate={this.props.activeDate} selectDateCallback={this.props.selectDateCallback} />
          </div>
        </div>
      </div>
    );
  }
}
export default CalendarHeader;
