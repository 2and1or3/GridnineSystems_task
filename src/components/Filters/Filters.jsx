import React from 'react';

import Radio from '@/components/Radio/Radio';
import Checkbox from '@/components/Checkbox/Checkbox';

function Filters() {
  return (
    <form className="flights-page__filters filters">
      <fieldset className="filters__box">
        <legend className="filters__box-title">Сортировать</legend>
        <Radio htmlFor="priceUp" label="по возрастанию цены" />
        <Radio htmlFor="priceDown" label="по убыванию цены" />
        <Radio htmlFor="trackTime" label="по времени в пути" />
      </fieldset>

      <fieldset className="filters__box">
        <legend className="filters__box-title">Фильтровать</legend>
        <Checkbox htmlFor="transfer-0" label="без пересадок" />
        <Checkbox htmlFor="transfer-1" label="1 пересадка" />
      </fieldset>

      <fieldset className="filters__box">
        <legend className="filters__box-title">Цена</legend>
        <label className="filters__box-label price-box" htmlFor="min-price">
          От
          <input type="text" placeholder="0" name="min-price" id="min-price" />
        </label>
        <label className="filters__box-label price-box" htmlFor="max-price">
          До
          <input type="text" placeholder="100000" name="max-price" id="max-price" />
        </label>
      </fieldset>

      <fieldset className="filters__box">
        <legend className="filters__box-title">Авиакомпании</legend>
        <Checkbox htmlFor="company-1" label="Название компании от 21049 р." />
        <Checkbox htmlFor="company-2" label="Название компании от 21049 р." />
      </fieldset>
    </form>

  );
}

export default Filters;
