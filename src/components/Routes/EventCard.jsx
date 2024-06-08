import styles from "../../styles/styles.js";
import {Link} from "react-router-dom";

export const EventCard = ({data}) => {
    return (
        <>
            <div className={`w-full block bg-white rounded-lg lg:flex p-2`}>
                <div className="w-full lg:-w[50%] m-auto">
                    <img src={`https://afreebmart.com/images/products/${data.image}`} alt=""/>
                </div>
                <div className="w-full lg:[w-50%] flex flex-col justify-center">
                    <h2 className={`${styles.productTitle}`}>{data.product_name}</h2>
                    <p>{data.description}</p>
                    <div className="flex py-2 justify-between">
                        <div className="flex">
                            {/*<h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">*/}
                            {/*    {data.price}$*/}
                            {/*</h5>*/}
                            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                                ${data.price}
                            </h5>
                        </div>
                        {/*<span className="pr-3 font-[400] text-[17px] text-[#44a55e]">*/}
                        {/*    {data.sold_out} sold*/}
                        {/*</span>*/}
                    </div>
                    {/*<CountDown data={data}/>*/}
                    <br/>
                    <div className="flex items-center">
                        <Link to={`/product/${data.product_name}?isEvent=true`}>
                            <div className={`${styles.button} text-[#fff]`}>See Details</div>
                        </Link>
                        <div className={`${styles.button} text-[#fff] ml-5`}>Join Group
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}