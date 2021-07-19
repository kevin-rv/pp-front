/*

!!! Here are all the available properties, all of which are optional: !!!

id	OK
String or Integer. Will uniquely identify your event. Useful for getEventById.

// groupId
// String or Integer. Events that share a groupId will be dragged and resized together automatically.

// allDay
// Boolean (true or false). Determines if the event is shown in the “all-day” section of the view, if applicable. Determines if time text is displayed in the event. If this value is not specified, it will be inferred by the start and end properties. See notes below.

Do not put quotes around this value. That would make it a string, not a boolean.

start OK
Something date-parseable. When your event begins. If your event is explicitly allDay, hour, minutes, seconds and milliseconds will be ignored.

end OK
Something date-parseable. When your event ends. If your event is explicitly allDay, hour, minutes, seconds and milliseconds will be ignored. If omitted, your events will appear to have the default duration. See defaultAllDayEventDuration, defaultTimedEventDuration, and forceEventDuration for more info.

Note: This value is exclusive. For example, if you have an all-day event that has an end of 2018-09-03, then it will span through 2018-09-02 and end before the start of 2018-09-03.

// daysOfWeek
// Array. (For defining a simple recurring event). The days of the week this event repeats. An array of integers representing days e.g. [0, 1] for an event that repeats on Sundays and Mondays.

// startTime
// Something duration-parseable. (For defining a simple recurring event). The time of day the event starts.
//
// endTime
// Something duration-parseable. (For defining a simple recurring event). The time of day the event ends.
//
// startRecur
// Something date-parseable. (For defining a simple recurring event). When recurrences of the event start.
//
// endRecur
// Something date-parseable. (For defining a simple recurring event). When recurrences of the event end.

title OK
String. The text that will appear on an event.

// url
// String. A URL that will be visited when this event is clicked by the user. For more information on controlling this behavior, see the eventClick callback.

// className or
// classNames
// String or Array. A single string like 'myclass', a space-separated string like 'myclass1 myclass2', or an array of strings like [ 'myclass1', myclass2' ]. Determines which HTML classNames will be attached to the rendered event.

// editable
// Boolean (true or false). Overrides the master editable option for this single event.

// startEditable
// Boolean (true or false). Overrides the master eventStartEditable option for this single event.
//
// durationEditable
// Boolean (true or false). Overrides the master eventDurationEditable option for this single event.
//
// resourceEditable
// Boolean (true or false). Overrides the master eventResourceEditable option for this single event. Requires one of the resource plugins.
//
// resourceId
// String. The string ID of a Resource. See Associating Events with Resources. Requires one of the resource plugins.
//
// resourceIds
// Array. An array of string IDs of Resources. See Associating Events with Resources. Requires one of the resource plugins.
//
// display
// Allows alternate rendering of the event, like background events. Can be 'auto' (the default), 'block', 'list-item', 'background', 'inverse-background', or 'none'. See eventDisplay.
//
// overlap
// Boolean (true or false). Overrides the master eventOverlap option for this single event. If false, prevents this event from being dragged/resized over other events. Also prevents other events from being dragged/resized over this event.
//
// constraint
// A groupId belonging to other events, "businessHours", or an object. Overrides the master eventConstraint option for this single event.
//
// color
// String. An alias for specifying the backgroundColor and borderColor at the same time.
//
// backgroundColor
// Sets an event’s background color just like the calendar-wide eventBackgroundColor option.
//
// borderColor
// Sets an event’s border color just like the calendar-wide eventBorderColor option.
//
// textColor
// Sets an event’s text color just like the calendar-wide eventTextColor option.
//
// rrule
// duration
// These properties are for RRule recurrence.
//
// daysOfWeek
// startTime
// endTime
// startRecur
// endRecur
// groupId
// These properties are for “simple” recurrence.
//
// extendedProps
// Object. A plain object with any miscellaneous properties. It will be directly transferred to the extendedProps hash in each Event Object. Often, these props are useful in event render hooks.
//
// any other property!
// Every other non-standard property will be transferred over to the extendedProps hash in the Event Object. However, it is recommended to explicitly define these in the extendedProps hash.
 */

class EventAdapter {

    static _dateConvertCleanUp(date)
    {
        return date.toISOString().replace('.000Z', '+00:00')
    }

    static adaptToFullCalendarEvent(event)
    {
        let translatedEvent = {}
        translatedEvent.id = event.id
        translatedEvent.title = event.shortDescription
        translatedEvent.start = event.startDatetime
        translatedEvent.end = event.endDatetime
        translatedEvent.extendedProps = {}
        translatedEvent.extendedProps.fullDescription = event.fullDescription
        translatedEvent.extendedProps.tooltip = null

        return translatedEvent
    }

    static adaptFromFullCalendarEvent(event)
    {
        let translatedEvent = {}
        translatedEvent.id = event.id
        translatedEvent.shortDescription = event.title
        translatedEvent.startDatetime = this._dateConvertCleanUp(event.start)
        translatedEvent.endDatetime = this._dateConvertCleanUp(event.end)
        translatedEvent.fullDescription = event.extendedProps.fullDescription

        return translatedEvent
    }

    static adaptCreateFullCalendarEvent(event)
    {
        let translatedEvent = {}
        translatedEvent.shortDescription = event.title
        translatedEvent.startDatetime = this._dateConvertCleanUp(event.start)
        translatedEvent.endDatetime = this._dateConvertCleanUp(event.end)
        translatedEvent.fullDescription = event.extendedProps.fullDescription
        return translatedEvent
    }
}

export default EventAdapter;