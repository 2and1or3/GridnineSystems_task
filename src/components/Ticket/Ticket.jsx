import React from 'react';

import Flight from '@/components/Flight/Flight';

class Ticket extends React.PureComponent {
  render() {
    const price = this.props.ticket.flight.price.total.amount;
    const { legs } = this.props.ticket.flight;

    return (
      <article className="ticket">
        <header className="ticket__header">
          <span className="ticket__img" />
          <p className="ticket__price-box">
            <span className="ticket__price">
              {price}
              {' '}
              ₽
            </span>
            <span className="ticket__label">Стоимость для одного взрослого пассажира</span>
          </p>
        </header>
        {legs.map((leg) => <Flight leg={leg} key={leg.segments[0].flightNumber} />)}
        <button className="ticket__button" type="button">Выбрать</button>
      </article>
    );
  }
}

export default Ticket;
