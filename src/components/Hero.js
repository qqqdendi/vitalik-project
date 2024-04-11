import React, { memo } from 'react';

import heroBg from '../img/page/hero-bg2.png';
import heroBgMob from '../img/page/hero-mob-bg.png';
import MintIcon from './UI/MintIcon';

const Hero = ({
  setFormOpen, setMintOpen, setNotifyMint
}) => {
    return (
    <section className="hero" id="hero">
        <picture>
          <source srcSet={heroBg} type="image/png" media="(min-width: 575px)"/>
          <source srcSet={heroBgMob} type="image/png" media="(max-width: 575px)"/>
          {/* <img className="hero__bg" src={heroBg} alt="bg"/> */}
        </picture>
        <div className="container">
          <div className="hero__wrap">
            <p className="hero__overhead">«
Volt:   Заряжая завтра   солнечной энергией! —<br/> Присоединяйтесь к радости революции Web3 для устойчивых инвестиций.</p>
            <h1 className="hero__title title">Volt<span className="title--red">token</span> .</h1>
            <p className="hero__subtitle">
Volt - цифровой актив, революционизирующий будущее энергетики с акцентом на солнечную энергию. Инвестируйте в Volt, чтобы получить доступ к прибыльным проектам по возобновляемой энергии по всему миру. Присоединяйтесь к нам сегодня, чтобы сделать наш мир чище и устойчивее с Volt!</p>
            <div className="hero__btns">
              <button 
                onClick={() => setFormOpen(prev => !prev)}
                className="hero__btn btn btn--red" 
                data-modal="form"
              >
                  <span>get whitelisted</span>
              </button>
              <MintIcon 
                setNotifyMint={setNotifyMint} 
                setMintOpen={setMintOpen} 
              />
            </div>
          </div>
        </div>
    </section>
    );
};

export default memo(Hero);
