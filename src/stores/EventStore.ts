import {createContext} from 'react'
import {observable} from 'mobx'
import {Event} from '../types'

class EventStore {
    @observable events: Event[] = []
}

export const EventStoreContext = createContext(new EventStore())