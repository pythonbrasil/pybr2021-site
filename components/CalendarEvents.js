import { Component } from 'react';


class Event extends Component {
  getColors(room) {
    var baseClasses = ["text-opacity-80", "border-8"];
    var hoverClasses = ["transition", "duration-200", "hover:border-black", "hover:border-opacity-20"];
    const colors = {
      "Shirley Ann Jackson": {
        "base": baseClasses.concat([
          "bg-azulEscuro",
          "text-white",
          "border-azulEscuro",
        ]).join(" "),
        "hover": hoverClasses.concat([
        ]).join(" "),
      },
      "Marie Van Brittan Brown": {
        "base": baseClasses.concat([
          "bg-rosa",
          "text-black",
          "border-rosa",
        ]).join(" "),
        "hover": hoverClasses.concat([
        ]).join(" "),
      },
      "Timnit Gebru": {
        "base": baseClasses.concat([
          "bg-amarelo",
          "text-black",
          "border-amarelo",
        ]).join(" "),
        "hover": hoverClasses.concat([
        ]).join(" "),
      },
      "Angelica Ross": {
        "base": baseClasses.concat([
          "bg-azul",
          "text-black",
          "border-azul",
        ]).join(" "),
        "hover": hoverClasses.concat([
        ]).join(" "),
      },
      "Bonnie Prado Pinto": {
        "base": baseClasses.concat([
          "bg-verde",
          "text-black",
          "border-verde",
        ]).join(" "),
        "hover": hoverClasses.concat([
        ]).join(" "),
      },
    };

    return room ? colors[room] : {
      "base": baseClasses.concat([
        "text-gray-700",
        "bg-white",
        "border-gray-100",
      ]).join(" "),
      "hover": hoverClasses.concat([
        "hover:border-opacity-15",
      ]).join(" "),
    };
  }

  renderLabel(icon, text) {
    return (
      <div className="flex">
        {icon}
        <div>
          <span className={`bg-black bg-opacity-40 text-black text-opacity-80 px-1 rounded bg-gray-200`}>
            {text}
          </span>
        </div>
      </div>
    );
  }

  renderLive(link) {
    return (
      <div className={`inline text-red-500 px-1 rounded bg-white hover:text-white hover:bg-red-600 xl:inline-block`}>
        <a href={link}>Assistir</a>
      </div>
    );
  }

  isKeynote(type) {
    return type == "keynote" || type == "panel";
  }

  renderKeynote(summary, description) {
    return (
      <div className="font-medium">
        <div className="font-bold text-lg text-gray-600">{summary}</div>
        {description && <div>{description}</div>}
      </div>
    );
  }

  renderSummary(type, summary, description) {
    if (this.isKeynote(type)) return this.renderKeynote(summary, description);

    return (
      <div className="font-medium">
        <div>{summary}</div>
        {type == "keynote" && <div>{description}</div>}
      </div>
    );
  }


  render() {
    const {summary, description, location} = this.props.event;
    const {type, author, youtube_channel} = this.props.event.extendedProperties.private;

    const colors = this.getColors(location);
    return (
      <div className={`flex xl:flex-1 flex-col space-y-1 py-4 px-4 ${colors.base} ${colors.hover} ${location}`}>
        <div className={`xl:flex-grow xl:mb-6`}>
          {this.renderSummary(type, summary, description)}
        </div>
        <div className="flex text-sm flex-col space-y-1">
          {author && this.renderLabel("🐍", author)}
          {location && this.renderLabel("📍", location)}
          <div className="flex-grow xl:hidden"></div>
          <div>🎬 {this.renderLive(youtube_channel)}</div>
        </div>
      </div>
    );
  }
}

class EventSlot extends Component {
  render() {
    const events = this.props.events.map((event, key) => <Event key={key} event={event} />);
    return (
      <div className="flex xl:flex-col items-center rounded bg-gray-200 text-gray-600">
        <div className="xl:flex px-6 xl:px-10 py-4 text-lg text-center font-bold">
          <div>{this.props.startHour}</div>
          <div className="text-gray-500 px-4">-</div>
          <div>{this.props.endHour}</div>
        </div>
        <div className="w-full xl:flex">
          {events}
        </div>
      </div>
    );
  }
}

class CalendarEvents extends Component {
  renderSlots(groupedEvents) {
    return groupedEvents.map((startBy, indexGroup) => {
      const startHour = startBy[0];
      const eventsGroupedByStart = Object.entries(startBy[1]);
      return eventsGroupedByStart.map((endBy, index) => {
        const endHour = endBy[0];
        const events = endBy[1];
        return (
          <EventSlot key={`${indexGroup}-${index}-${startHour}-${endHour}`} startHour={startHour} endHour={endHour} events={events}/>
        );
      });
    })

  }
  render() {
    return (
      <div className="xl:max-w-screen-xl xl:mx-auto p-2 space-y-4">
        {this.renderSlots(Object.entries(this.props.events))}
      </div>
    )
  }
}

export default CalendarEvents;
