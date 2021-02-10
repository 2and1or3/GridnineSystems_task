import React from 'react';

import Ticket from '@/components/Ticket/Ticket';

const INITIAL_COUNT = 2;
const TICKETS_STEP = 2;

class TicketsContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.tickets = props.tickets;

    this.state = {
      ticketsCount: INITIAL_COUNT,
    };

    this.addTickets = this.addTickets.bind(this);
  }

  addTickets() {
    this.setState((state) => ({
      ticketsCount: state.ticketsCount + TICKETS_STEP,
    }));
  }

  render() {
    this.ticketsToRender = this.tickets.slice(0, this.state.ticketsCount);

    return (
      <section className="tickets-container">
        <div className="tickets-container__list">
          {
          this.ticketsToRender.map((ticket) => <Ticket ticket={ticket} key={ticket.flightToken} />)
        }
        </div>
        <button className="tickets-container__button" type="button" onClick={this.addTickets}>Показать еще</button>
      </section>
    );
  }
}

export default TicketsContainer;
