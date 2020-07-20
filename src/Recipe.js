import React from 'react';
import style from './recipe.module.css';
import { IoIosTime } from 'react-icons/io';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiCoffeeCup } from 'react-icons/gi'
import { FaShareAltSquare } from 'react-icons/fa';
import { WhatsappShareButton} from "react-share";








const Recipe = ({ title, publisher, image, time, serving, calories,shareUrl }) => {

    return (
        <div className={style.recipe}>
            <div style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "contain",
                width: "100%",
                height: "300px",
                backgroundRepeat: "no-repeat",
                borderTopLeftRadius: "9px",
                borderTopRightRadius: "9px",
            }} alt="">
            </div>
            <div className="description">

                <h1>{title}</h1>
                <div className="share">
                <WhatsappShareButton size={32} url={shareUrl}>
                 <FaShareAltSquare/>
                 </WhatsappShareButton>
                
                </div>
                <p>{publisher}</p>
                <div className="icons">
                    <div >

                        <IoIosTime />
                        <span>{time}</span>
                    </div>
                    <div>    
                    <GiCoffeeCup />

                        <span>
                        {serving}
                        </span>
                    </div>
                    <div>
                        <AiFillThunderbolt />
                        <span>{Math.round(calories)}</span>

                    </div>

                </div>
            </div>

        </div>


    );

}

export default Recipe;

