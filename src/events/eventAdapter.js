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
        translatedEvent.extendedProps.contacts = event.contacts

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
        translatedEvent.contacts = event.extendedProps.contacts.map(contact => contact.id)

        return translatedEvent
    }

    static adaptHolidayToFullCalendarEvent(holiday)
    {
        let translatedEvent = {}

        translatedEvent.title = holiday.nom_jour_ferie
        translatedEvent.start = holiday.date
        translatedEvent.display = 'background'
        translatedEvent.allDay = true

        return translatedEvent
    }

}

export default EventAdapter;
