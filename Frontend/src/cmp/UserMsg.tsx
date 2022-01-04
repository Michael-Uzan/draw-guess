import React from 'react'

import { eventBusService } from '../services/event-bus.service'


export class UserMsg extends React.Component {

  removeEvent: any;

  state: any | null = {
    msg: null
  }

  componentDidMount() {
    this.removeEvent = eventBusService.on('show-user-msg', (msg: string) => {
      this.setState({ msg })
      setTimeout(() => {
        this.setState({ msg: null })
      }, 4000)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
    if (!this.state.msg) return <></>
    const msgType = this.state.msg.type || ''
    return (
      <section className={`user-msg  flex direction-row align-center ${msgType}`}>
        <div className=" txt-msg flex direction-row align-center">
          {this.state.msg.txt}
        </div>
        <button onClick={() => {
          this.setState({ msg: null })
        }}>x</button>
      </section>
    )
  }
}
