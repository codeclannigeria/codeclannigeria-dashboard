import { action, observable, computed, runInAction } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import { useMemo } from 'react'

useStaticRendering(typeof window === 'undefined')

let store: Store

interface Payload {
  lastUpdate: number
  light: string
}

export class Store {
  @observable lastUpdate = 0
  @observable light = false
  @observable count = 0
  private timer: NodeJS.Timeout

  @action start = () => {
    this.timer = setInterval(() => {
      runInAction(() => {
        this.lastUpdate = Date.now()
        this.light = true
      })
    }, 1000)
  }
  @action incrementCount = () => {
    runInAction(() => this.count++)
  }

  @action decrementCount = () => {
    runInAction(() => this.count--)
  }

  @computed get timeString(): string {
    const pad = (n: number) => (n < 10 ? `0${n}` : n)
    const format = (t: Date) =>
      `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(
        t.getUTCSeconds()
      )}`
    return format(new Date(this.lastUpdate))
  }

  stop = (): void => clearInterval(this.timer)

  hydrate = (data: Payload): void => {
    if (!data) return

    const { lastUpdate, light } = data

    this.lastUpdate = lastUpdate ?? Date.now()
    this.light = !!light
  }
}

function initializeStore(initialData?: Payload): Store {
  const _store = store ?? new Store()

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: any): Store {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
