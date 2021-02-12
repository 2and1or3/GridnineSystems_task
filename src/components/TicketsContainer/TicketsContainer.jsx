import React from 'react';

import Ticket from '@/components/Ticket/Ticket';

const INITIAL_COUNT = 2;
const TICKETS_STEP = 2;

class TicketsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketsCount: INITIAL_COUNT,
    };

    this.addTickets = this.addTickets.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isResetTicketsCount = nextProps.tickets[0] !== this.props.tickets[0]
    && this.state.ticketsCount === nextState.ticketsCount;

    if (isResetTicketsCount) {
      this.setState({
        ticketsCount: INITIAL_COUNT,
      });
    }

    const isUpdate = (this.props !== nextProps || this.state !== nextState) && !isResetTicketsCount;

    return isUpdate;
  }

  addTickets() {
    this.setState((state) => ({
      ticketsCount: state.ticketsCount + TICKETS_STEP,
    }));
  }

  render() {
    this.ticketsToRender = this.props.tickets.slice(0, this.state.ticketsCount);
    const isShow = this.state.ticketsCount < this.props.tickets.length;

    const isEmpty = !this.ticketsToRender.length;

    const list = (
      <div className="tickets-container__list">
        {
          this.ticketsToRender.map((ticket) => <Ticket ticket={ticket} key={ticket.flightToken} />)
          }
      </div>
    );

    return (
      <section className="tickets-container">
        {!isEmpty ? list : 'Данные не найдены'}
        {isShow ? <button className="tickets-container__button" type="button" onClick={this.addTickets}>Показать еще</button> : ''}
      </section>
    );
  }
}

export default TicketsContainer;
