import {useEffect, useState} from 'react';


import Header from './components/Header';
import Hero from './components/Hero';
import Storyline from './components/Storyline';
import RoudMap from './components/RoudMap';
import Team from './components/Team';
import FAQ from './components/FAQ.js';


import './App.css';

export const CONTRACT_ADDRESS = '0xF19ac623eEaB1c7910A58C4A3145f4Ee7515e9bE' //main
function App() {
    //Стейты модалок
   

    const updateBgData = () => {
        const bgMain = document.querySelectorAll('.main-bg');
        const arrBg = [];
        bgMain.forEach(bg => {
            let rect = bg.getBoundingClientRect();
            const top = rect.top + document.body.scrollTop;
            const bottom = rect.bottom + document.body.scrollTop;
            const obj = {target: bg, top: top, bottom: bottom};
            arrBg.push(obj)
        })
        paralaxBgMain(arrBg)
    }

    const paralaxBgMain = (posBg) => {
        document.addEventListener('scroll', () => {
            posBg.forEach(item => {
                if (window.scrollY > item.top && item.bottom > window.scrollY) {
                    const rect = item.target.getBoundingClientRect();
                    item.target.classList.add('focus');
                    item.target.style.top = `${rect.top * 0.2}px`;
                } else {
                    item.target.classList.remove('focus');
                    item.target.style.top = null;
                }
            })
        })
    }

    
    useEffect(() => {
        setTimeout(() => {
            updateBgData();
        }, 2000)
        window.addEventListener('resize', () => {
            setTimeout(() => updateBgData(), 100)
        })
        
    }, [])

    return (
            <div className="App wrapper">
                <Header/>
                <main>
                    <Hero
                    />
                    <Storyline/>
                    {/* <Elements/> */}
                    <RoudMap/>
                    {/* <Facts/> */}
                    {/* <Table/> */}
                    <Team/>
                    <FAQ/>
                </main>

               
            </div>
    );
}

export default App;
