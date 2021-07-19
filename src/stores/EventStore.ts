import {observable, action, makeAutoObservable} from 'mobx'
import {EventData} from '../types'
import api from '../api'

export class EventStore {
    constructor() {
        makeAutoObservable(this)
    }

    @observable totalEvents: number = 0
    @observable hasMore: boolean = true
    @observable perPage: number = 20
    @observable event: EventData | null = null
    @observable eventSnapShot: any = null
    @observable events: EventData[] = []
    @observable firebaseDocs: any[] = []
    @observable lastDoc: any = null

    @action clearEvents: () => void = () => {
        this.events = []
    }

    @action setTotalEvents: () => void = () => {
        api.getTotalEvents().then(action((total: number) => {
            this.totalEvents = total
        }))
    }

    @action setEvent: (id: string) => void = (id) => {
        api.getEvent(parseInt(id)).then(action((event: any) => {
            this.eventSnapShot = event[0]
            this.event = event[0].data()
        }))
    }

    @action editEvent: (field: keyof EventData, data: any) => void = (field, data) => {
        if (this.event) {
            this.event[field] = data
        }
    }

    @action updateEvent: () => Promise<void> = () => {
        return api.updateEvent(this.eventSnapShot, this.event)
    }

    @action setEvents: () => void = () => {
        this.hasMore = false
        api.getEvents(this.lastDoc || 0, this.perPage)
            .then(action((events) => {
                this.firebaseDocs = this.firebaseDocs.length ? [...this.firebaseDocs, ...events] : events
                this.lastDoc = this.firebaseDocs[this.firebaseDocs.length - 1]
                this.hasMore = this.firebaseDocs.length < this.totalEvents

                this.events = this.firebaseDocs.map(snapshot => snapshot.data())
            }))
    }

}

export const EventStoreImpl = new EventStore()