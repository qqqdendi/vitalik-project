import React, { memo } from 'react';


const MintIcon = ({
    setMintOpen,  setNotifyMint, 
}) => {
    
    
    return (
        <button 
            className="hero__btn btn btn--green modal-btn" 
            data-modal="mint-form"
        >
            <span>mint</span>
        </button>
    );
};

export default memo(MintIcon);